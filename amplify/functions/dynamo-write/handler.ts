import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

const ALLOWED_TABLES = [
  'Cars',
  'Courses',
  'documents',
  'DrivingCourseSteps',
  'FAQ',
  'Gallery',
  'HomeSteps',
  'Instructors',
  'Testimonials',
] as const;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const client = new DynamoDBClient({ region: 'eu-central-1' });
const docClient = DynamoDBDocumentClient.from(client);

function response(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}

function isAllowedTable(tableName: string): boolean {
  return (ALLOWED_TABLES as readonly string[]).includes(tableName);
}

function getHttpMethod(event: Record<string, unknown>): string | undefined {
  // Support both REST API (httpMethod) and HTTP API (requestContext.http.method)
  if (typeof event.httpMethod === 'string') {
    return event.httpMethod;
  }
  const requestContext = event.requestContext as Record<string, unknown> | undefined;
  if (requestContext) {
    const http = requestContext.http as Record<string, unknown> | undefined;
    if (http && typeof http.method === 'string') {
      return http.method;
    }
  }
  return undefined;
}

async function handlePost(tableName: string, item: Record<string, unknown>) {
  await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: item,
    })
  );
  return response(201, { data: item });
}

async function handlePut(tableName: string, item: Record<string, unknown>) {
  const { Id, ...attributes } = item;

  if (Object.keys(attributes).length === 0) {
    return response(400, { error: 'No attributes to update' });
  }

  const expressionParts: string[] = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, unknown> = {};

  Object.entries(attributes).forEach(([key, value], index) => {
    const nameAlias = `#attr${index}`;
    const valueAlias = `:val${index}`;
    expressionParts.push(`${nameAlias} = ${valueAlias}`);
    expressionAttributeNames[nameAlias] = key;
    expressionAttributeValues[valueAlias] = value;
  });

  const updateExpression = `SET ${expressionParts.join(', ')}`;

  try {
    const result = await docClient.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { Id: Id as string },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ConditionExpression: 'attribute_exists(Id)',
        ReturnValues: 'ALL_NEW',
      })
    );
    return response(200, { data: result.Attributes || item });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.name === 'ConditionalCheckFailedException'
    ) {
      return response(404, { error: 'Item not found' });
    }
    throw error;
  }
}

async function handleDelete(tableName: string, id: string) {
  try {
    await docClient.send(
      new DeleteCommand({
        TableName: tableName,
        Key: { Id: id },
        ConditionExpression: 'attribute_exists(Id)',
      })
    );
    return response(200, { data: { id } });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.name === 'ConditionalCheckFailedException'
    ) {
      return response(404, { error: 'Item not found' });
    }
    throw error;
  }
}

export const handler = async (event: Record<string, unknown>) => {
  try {
    // Handle OPTIONS preflight
    const method = getHttpMethod(event);
    if (method === 'OPTIONS') {
      return response(200, {});
    }

    // Validate table name
    const pathParameters = event.pathParameters as Record<string, string> | undefined;
    const tableName = pathParameters?.tableName;

    if (!tableName || !isAllowedTable(tableName)) {
      return response(400, {
        error: `Invalid table name. Allowed tables: ${ALLOWED_TABLES.join(', ')}`,
      });
    }

    // Validate HTTP method
    const httpMethod = method?.toUpperCase();
    if (!httpMethod || !['POST', 'PUT', 'DELETE'].includes(httpMethod)) {
      return response(400, { error: 'Invalid HTTP method. Use POST, PUT, or DELETE.' });
    }

    // Parse and validate request body
    const bodyStr = event.body as string | undefined;
    if (!bodyStr) {
      return response(400, { error: 'Request body is required' });
    }

    let parsedBody: Record<string, unknown>;
    try {
      parsedBody = JSON.parse(bodyStr);
    } catch {
      return response(400, { error: 'Invalid JSON in request body' });
    }

    if (typeof parsedBody !== 'object' || parsedBody === null || Array.isArray(parsedBody)) {
      return response(400, { error: 'Request body must be a JSON object' });
    }

    // Route by method
    switch (httpMethod) {
      case 'POST': {
        if (Object.keys(parsedBody).length === 0) {
          return response(400, { error: 'Request body must contain item attributes' });
        }
        return await handlePost(tableName, parsedBody);
      }
      case 'PUT': {
        if (!parsedBody.Id) {
          return response(400, { error: 'Request body must contain an Id field' });
        }
        return await handlePut(tableName, parsedBody);
      }
      case 'DELETE': {
        if (!parsedBody.Id) {
          return response(400, { error: 'Request body must contain an Id field' });
        }
        return await handleDelete(tableName, parsedBody.Id as string);
      }
      default:
        return response(400, { error: 'Invalid HTTP method' });
    }
  } catch (error: unknown) {
    console.error('Write operation failed:', error);
    return response(500, { error: 'Internal server error' });
  }
};
