import { fetchAuthSession } from 'aws-amplify/auth';

// The certificate-generation API is a separate backend from the main app API,
// so it has its own base URL (set VITE_CERT_API_URL in the frontend .env).
const BASE_URL = import.meta.env.VITE_CERT_API_URL;

async function authHeader() {
  const session = await fetchAuthSession();
  const token = session.tokens.accessToken.toString();
  return { Authorization: `Bearer ${token}` };
}

function ensureConfigured() {
  if (!BASE_URL) {
    throw new Error('VITE_CERT_API_URL is not configured.');
  }
}

/** GET the customer roster for a year. Returns { year, count, customers }. */
export async function fetchRoster(year) {
  ensureConfigured();
  const headers = await authHeader();
  const res = await fetch(`${BASE_URL}/documents/${year}/customers`, { headers });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Roster request failed (${res.status})`);
  }
  return res.json();
}

/** Generate one certificate; returns a Blob (PDF). */
export async function generateOne(year, customerId) {
  ensureConfigured();
  const headers = await authHeader();
  const res = await fetch(`${BASE_URL}/documents/${year}/${customerId}`, {
    method: 'POST',
    headers,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Generation failed (${res.status})`);
  }
  return res.blob();
}

/** Generate a group as one merged PDF; returns { pages, download_url }. */
export async function generateGroup(year, group) {
  ensureConfigured();
  const headers = await authHeader();
  const res = await fetch(`${BASE_URL}/documents/${year}/group/${group}`, {
    method: 'POST',
    headers,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Group generation failed (${res.status})`);
  }
  return res.json();
}

/** Start generate-all; returns { job_id, status }. */
export async function startGenerateAll(year) {
  ensureConfigured();
  const headers = await authHeader();
  const res = await fetch(`${BASE_URL}/documents/${year}`, {
    method: 'POST',
    headers,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Generate-all failed (${res.status})`);
  }
  return res.json();
}

/** Poll a generate-all job. Returns { status, generated, skipped, download_url? }. */
export async function fetchJobStatus(jobId) {
  ensureConfigured();
  const headers = await authHeader();
  const res = await fetch(`${BASE_URL}/documents/jobs/${jobId}`, { headers });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Job status failed (${res.status})`);
  }
  return res.json();
}
