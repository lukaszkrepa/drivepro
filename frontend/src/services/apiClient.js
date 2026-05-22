import { fetchAuthSession } from 'aws-amplify/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function getAuthToken() {
  const session = await fetchAuthSession();
  return session.tokens.accessToken.toString();
}

async function request(method, path, body, requiresAuth) {
  const url = `${BASE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json' };

  if (requiresAuth) {
    const token = await getAuthToken();
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error('Unable to reach the server. Please check your connection.');
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const apiClient = {
  get(path) {
    return request('GET', path, undefined, false);
  },
  post(path, body) {
    return request('POST', path, body, true);
  },
  put(path, body) {
    return request('PUT', path, body, true);
  },
  del(path, body) {
    return request('DELETE', path, body, true);
  },
};
