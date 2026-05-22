import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const BUCKET_NAME = 'driveprophotos';
const REGION = 'eu-central-1';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const s3Client = new S3Client({ region: REGION });

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface UploadRequest {
  fileName: string;
  fileType: 'image' | 'document';
  contentType: string;
  body: string; // base64-encoded file content
}

interface DeleteRequest {
  url: string; // Full S3 URL to delete
}

function response(statusCode: number, body: object) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
    body: JSON.stringify(body),
  };
}

function getPrefix(fileType: string): string | null {
  if (fileType === 'image') return 'uploads/';
  if (fileType === 'document') return 'documents/';
  return null;
}

function isValidBucketUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === `${BUCKET_NAME}.s3.${REGION}.amazonaws.com` ||
      parsed.hostname === `${BUCKET_NAME}.s3.amazonaws.com`
    );
  } catch {
    return false;
  }
}

function extractKeyFromUrl(url: string): string {
  const parsed = new URL(url);
  // Remove leading slash from pathname
  return decodeURIComponent(parsed.pathname.slice(1));
}

async function handleUpload(body: string): Promise<ReturnType<typeof response>> {
  let parsed: UploadRequest;
  try {
    parsed = JSON.parse(body);
  } catch {
    return response(400, { error: 'Invalid JSON body' });
  }

  const { fileName, fileType, contentType, body: fileBody } = parsed;

  if (!fileName || !fileType || !contentType || !fileBody) {
    return response(400, { error: 'Missing required fields: fileName, fileType, contentType, body' });
  }

  const prefix = getPrefix(fileType);
  if (!prefix) {
    return response(400, { error: 'Invalid fileType. Must be "image" or "document"' });
  }

  // Decode base64 content
  const fileBuffer = Buffer.from(fileBody, 'base64');

  // Enforce 10 MB file size limit
  if (fileBuffer.length > MAX_FILE_SIZE) {
    return response(400, { error: 'File size exceeds the maximum allowed size of 10 MB' });
  }

  const uuid = crypto.randomUUID();
  const key = `${prefix}${uuid}-${fileName}`;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      })
    );

    const url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
    return response(200, { data: { url } });
  } catch (error) {
    console.error('S3 PutObject failed:', error);
    return response(500, { error: 'Internal server error' });
  }
}

async function handleDelete(body: string): Promise<ReturnType<typeof response>> {
  let parsed: DeleteRequest;
  try {
    parsed = JSON.parse(body);
  } catch {
    return response(400, { error: 'Invalid JSON body' });
  }

  const { url } = parsed;

  if (!url) {
    return response(400, { error: 'Missing required field: url' });
  }

  if (!isValidBucketUrl(url)) {
    return response(400, { error: 'Invalid URL. Must reference the driveprophotos S3 bucket' });
  }

  const key = extractKeyFromUrl(url);

  if (!key) {
    return response(400, { error: 'Invalid URL. Could not extract object key' });
  }

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
    );

    return response(200, { data: { deleted: key } });
  } catch (error) {
    console.error('S3 DeleteObject failed:', error);
    return response(500, { error: 'Internal server error' });
  }
}

export const handler = async (event: any) => {
  const method = event.requestContext?.http?.method || event.httpMethod;

  // Handle OPTIONS preflight
  if (method === 'OPTIONS') {
    return response(200, {});
  }

  const body = event.body || '';

  if (method === 'POST') {
    return handleUpload(body);
  }

  if (method === 'DELETE') {
    return handleDelete(body);
  }

  return response(400, { error: `Unsupported HTTP method: ${method}` });
};
