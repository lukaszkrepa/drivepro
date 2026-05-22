import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { dynamoRead } from './functions/dynamo-read/resource';
import { dynamoWrite } from './functions/dynamo-write/resource';
import { s3Operations } from './functions/s3-operations/resource';
import { createApi } from './functions/api/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  dynamoRead,
  dynamoWrite,
  s3Operations,
});

// Create a dedicated stack for the HTTP API
const apiStack = backend.createStack('api-stack');

// Set up the HTTP API Gateway with routes, authorizer, CORS, and IAM policies
const api = createApi({
  scope: apiStack,
  userPool: backend.auth.resources.userPool,
  userPoolClient: backend.auth.resources.userPoolClient,
  dynamoReadFn: backend.dynamoRead.resources.lambda,
  dynamoWriteFn: backend.dynamoWrite.resources.lambda,
  s3OperationsFn: backend.s3Operations.resources.lambda,
});

// Export the API endpoint for frontend configuration
backend.addOutput({
  custom: {
    API: {
      [api.httpApi.httpApiName!]: {
        endpoint: api.httpApi.url!,
        region: api.region,
        apiName: api.httpApi.httpApiName!,
      },
    },
  },
});
