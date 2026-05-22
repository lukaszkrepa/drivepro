import { defineFunction } from '@aws-amplify/backend';

export const dynamoRead = defineFunction({
  name: 'dynamo-read',
  timeoutSeconds: 30,
});
