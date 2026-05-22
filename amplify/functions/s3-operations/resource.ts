import { defineFunction } from '@aws-amplify/backend';

export const s3Operations = defineFunction({
  name: 's3-operations',
  timeoutSeconds: 30,
});
