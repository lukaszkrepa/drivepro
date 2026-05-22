import { defineFunction } from '@aws-amplify/backend';

export const dynamoWrite = defineFunction({
  name: 'dynamo-write',
  timeoutSeconds: 30,
});
