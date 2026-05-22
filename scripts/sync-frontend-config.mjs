import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const outputsPath = resolve(projectRoot, 'amplify_outputs.json');
const targetPath = resolve(projectRoot, 'frontend/src/amplify-config.js');

function readOutputs() {
  const contents = readFileSync(outputsPath, 'utf8');
  const outputs = JSON.parse(contents);

  const apiEntries = Object.values(outputs?.custom?.API ?? {});
  const apiEndpoint = apiEntries.find(
    (entry) => entry && typeof entry === 'object' && typeof entry.endpoint === 'string'
  )?.endpoint;

  if (!apiEndpoint) {
    throw new Error('amplify_outputs.json is missing custom.API.*.endpoint');
  }

  return {
    apiBaseUrl: apiEndpoint.replace(/\/$/, ''),
  };
}

function buildModule(config) {
  return `/* eslint-disable */
// WARNING: DO NOT EDIT. This file is generated from ../../amplify_outputs.json.

export const apiBaseUrl = '${config.apiBaseUrl}';
`;
}

function main() {
  const config = readOutputs();
  const moduleContents = buildModule(config);
  writeFileSync(targetPath, moduleContents, 'utf8');
  console.log(`Synced frontend config from ${outputsPath} to ${targetPath}`);
}

main();
