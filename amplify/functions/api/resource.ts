/**
 * HTTP API Gateway resource definition.
 *
 * This file exports a helper that creates the HTTP API with routes,
 * Cognito JWT authorizer, CORS, and IAM policies for the Lambda functions.
 *
 * It is consumed by amplify/backend.ts after defineBackend is called.
 */

import { Stack } from 'aws-cdk-lib';
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpUserPoolAuthorizer } from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import type { IUserPool, IUserPoolClient } from 'aws-cdk-lib/aws-cognito';
import type { IFunction } from 'aws-cdk-lib/aws-lambda';
import type { Construct } from 'constructs';

export interface ApiProps {
  /** CDK stack (or construct scope) to create resources in */
  scope: Construct;
  /** Cognito User Pool for JWT authorization */
  userPool: IUserPool;
  /** Cognito User Pool Client */
  userPoolClient: IUserPoolClient;
  /** DynamoDB read Lambda function */
  dynamoReadFn: IFunction;
  /** DynamoDB write Lambda function */
  dynamoWriteFn: IFunction;
  /** S3 operations Lambda function */
  s3OperationsFn: IFunction;
}

const DYNAMO_TABLES = [
  'Cars',
  'Courses',
  'documents',
  'DrivingCourseSteps',
  'FAQ',
  'Gallery',
  'HomeSteps',
  'Instructors',
  'Testimonials',
];

const REGION = 'eu-central-1';
const S3_BUCKET = 'driveprophotos';

export function createApi(props: ApiProps) {
  const {
    scope,
    userPool,
    userPoolClient,
    dynamoReadFn,
    dynamoWriteFn,
    s3OperationsFn,
  } = props;

  // Cognito JWT authorizer for write endpoints
  const userPoolAuthorizer = new HttpUserPoolAuthorizer(
    'CognitoAuthorizer',
    userPool,
    {
      userPoolClients: [userPoolClient],
    }
  );

  // Lambda integrations
  const dynamoReadIntegration = new HttpLambdaIntegration(
    'DynamoReadIntegration',
    dynamoReadFn
  );

  const dynamoWriteIntegration = new HttpLambdaIntegration(
    'DynamoWriteIntegration',
    dynamoWriteFn
  );

  const s3OperationsIntegration = new HttpLambdaIntegration(
    'S3OperationsIntegration',
    s3OperationsFn
  );

  // HTTP API with CORS
  const httpApi = new HttpApi(scope, 'DriveProHttpApi', {
    apiName: 'driveProApi',
    corsPreflight: {
      allowMethods: [
        CorsHttpMethod.GET,
        CorsHttpMethod.POST,
        CorsHttpMethod.PUT,
        CorsHttpMethod.DELETE,
        CorsHttpMethod.OPTIONS,
      ],
      allowOrigins: ['*'],
      allowHeaders: ['Content-Type', 'Authorization'],
    },
    createDefaultStage: true,
  });

  // GET /tables/{tableName} → dynamo-read (no auth)
  httpApi.addRoutes({
    path: '/tables/{tableName}',
    methods: [HttpMethod.GET],
    integration: dynamoReadIntegration,
  });

  // POST/PUT/DELETE /tables/{tableName} → dynamo-write (Cognito JWT authorizer)
  httpApi.addRoutes({
    path: '/tables/{tableName}',
    methods: [HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE],
    integration: dynamoWriteIntegration,
    authorizer: userPoolAuthorizer,
  });

  // POST /files → s3-operations (Cognito JWT authorizer)
  httpApi.addRoutes({
    path: '/files',
    methods: [HttpMethod.POST, HttpMethod.DELETE],
    integration: s3OperationsIntegration,
    authorizer: userPoolAuthorizer,
  });

  // IAM policies for DynamoDB access
  const dynamoDbPolicy = new PolicyStatement({
    actions: [
      'dynamodb:Scan',
      'dynamodb:GetItem',
      'dynamodb:PutItem',
      'dynamodb:UpdateItem',
      'dynamodb:DeleteItem',
    ],
    resources: DYNAMO_TABLES.map(
      (table) => `arn:aws:dynamodb:${REGION}:*:table/${table}`
    ),
  });

  // IAM policy for S3 access
  const s3Policy = new PolicyStatement({
    actions: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
    resources: [`arn:aws:s3:::${S3_BUCKET}/*`],
  });

  // Attach DynamoDB policy to read and write functions
  dynamoReadFn.addToRolePolicy(dynamoDbPolicy);
  dynamoWriteFn.addToRolePolicy(dynamoDbPolicy);

  // Attach S3 policy to s3-operations function
  s3OperationsFn.addToRolePolicy(s3Policy);

  return {
    httpApi,
    endpoint: httpApi.url,
    region: Stack.of(scope).region,
  };
}
