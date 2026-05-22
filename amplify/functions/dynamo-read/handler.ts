import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

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

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function isValidTable(tableName: string): boolean {
  return ALLOWED_TABLES.includes(tableName as (typeof ALLOWED_TABLES)[number]);
}

const client = new DynamoDBClient({ region: 'eu-central-1' });
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const tableName = event.pathParameters?.tableName;

  if (!tableName || !isValidTable(tableName)) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        error: `Invalid table name: "${tableName ?? ''}". Allowed tables: ${ALLOWED_TABLES.join(', ')}`,
      }),
    };
  }

  try {
    const items: Record<string, unknown>[] = [];
    let lastEvaluatedKey: Record<string, unknown> | undefined;

    do {
      const command = new ScanCommand({
        TableName: tableName,
        ...(lastEvaluatedKey && { ExclusiveStartKey: lastEvaluatedKey }),
      });

      const result = await docClient.send(command);

      if (result.Items) {
        items.push(...result.Items);
      }

      lastEvaluatedKey = result.LastEvaluatedKey as
        | Record<string, unknown>
        | undefined;
    } while (lastEvaluatedKey);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ data: items }),
    };
  } catch (error) {
    console.error('DynamoDB scan failed:', error);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
