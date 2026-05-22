import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const DEFAULT_GROUP_NAME = 'DriveProAdmin';
const outputsPath = resolve(process.cwd(), 'amplify_outputs.json');
const frontendAwsExportsPath = resolve(process.cwd(), 'frontend/src/aws-exports.js');

function printUsage() {
  console.log(`
Usage:
  node scripts/create-admin-user.mjs --email <email> --password <password> [--profile <aws-profile>] [--group <group-name>] [--user-pool-id <pool-id>] [--region <aws-region>] [--reset-group]

Examples:
  node scripts/create-admin-user.mjs --email admin@example.com --password 'StrongPass123!' --profile Lukasz
  npm run create-admin-user -- --email admin@example.com --password 'StrongPass123!'
  npm run create-admin-user -- --email admin@example.com --password 'StrongPass123!' --user-pool-id eu-west-1_Example --region eu-west-1 --reset-group
`);
}

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (!token.startsWith('--')) {
      continue;
    }

    const key = token.slice(2);
    const value = argv[i + 1];

    if (!value || value.startsWith('--')) {
      args[key] = true;
      continue;
    }

    args[key] = value;
    i += 1;
  }

  return args;
}

function readAmplifyOutputs() {
  if (!existsSync(outputsPath)) {
    throw new Error(`Missing amplify outputs file: ${outputsPath}`);
  }

  const contents = readFileSync(outputsPath, 'utf8');
  const outputs = JSON.parse(contents);
  const userPoolId = outputs?.auth?.user_pool_id;
  const region = outputs?.auth?.aws_region;

  if (!userPoolId || !region) {
    throw new Error(
      'Could not find auth.user_pool_id and auth.aws_region in amplify_outputs.json'
    );
  }

  return { userPoolId, region, source: outputsPath };
}

function readFrontendAwsExports() {
  if (!existsSync(frontendAwsExportsPath)) {
    return null;
  }

  const contents = readFileSync(frontendAwsExportsPath, 'utf8');
  const userPoolIdMatch = contents.match(/userPoolId:\s*['"]([^'"]+)['"]/);
  const regionMatch = contents.match(/region:\s*['"]([^'"]+)['"]/);

  if (!userPoolIdMatch || !regionMatch) {
    return null;
  }

  return {
    userPoolId: userPoolIdMatch[1],
    region: regionMatch[1],
    source: frontendAwsExportsPath,
  };
}

function resolveAuthConfig() {
  const frontendConfig = readFrontendAwsExports();
  const amplifyConfig = existsSync(outputsPath) ? readAmplifyOutputs() : null;

  if (frontendConfig && amplifyConfig) {
    if (
      frontendConfig.userPoolId !== amplifyConfig.userPoolId ||
      frontendConfig.region !== amplifyConfig.region
    ) {
      console.warn('Warning: frontend auth config does not match amplify_outputs.json');
      console.warn(
        `Frontend uses ${frontendConfig.userPoolId} in ${frontendConfig.region}`
      );
      console.warn(
        `Amplify outputs use ${amplifyConfig.userPoolId} in ${amplifyConfig.region}`
      );
    }
    return frontendConfig;
  }

  if (frontendConfig) {
    return frontendConfig;
  }

  return readAmplifyOutputs();
}

function runAwsCommand(baseArgs, options) {
  const fullArgs = ['cognito-idp', ...baseArgs, '--no-cli-pager'];

  if (options.region) {
    fullArgs.push('--region', options.region);
  }

  if (options.profile) {
    fullArgs.push('--profile', options.profile);
  }

  try {
    return execFileSync('aws', fullArgs, {
      stdio: 'pipe',
      encoding: 'utf8',
    });
  } catch (error) {
    const stderr =
      error && typeof error === 'object' && 'stderr' in error
        ? String(error.stderr || '').trim()
        : '';
    const stdout =
      error && typeof error === 'object' && 'stdout' in error
        ? String(error.stdout || '').trim()
        : '';
    const details = stderr || stdout;

    if (details) {
      throw new Error(details);
    }

    throw error;
  }
}

function commandSucceeds(baseArgs, options) {
  try {
    runAwsCommand(baseArgs, options);
    return true;
  } catch {
    return false;
  }
}

function ensureGroupExists({ groupName, userPoolId, region, profile }) {
  const options = { region, profile };
  const exists = commandSucceeds(
    ['get-group', '--user-pool-id', userPoolId, '--group-name', groupName],
    options
  );

  if (exists) {
    console.log(`Group already exists: ${groupName}`);
    return;
  }

  runAwsCommand(
    ['create-group', '--user-pool-id', userPoolId, '--group-name', groupName],
    options
  );
  console.log(`Created group: ${groupName}`);
}

function deleteGroupIfExists({ groupName, userPoolId, region, profile }) {
  const options = { region, profile };
  const exists = commandSucceeds(
    ['get-group', '--user-pool-id', userPoolId, '--group-name', groupName],
    options
  );

  if (!exists) {
    console.log(`Group does not exist, nothing to delete: ${groupName}`);
    return;
  }

  runAwsCommand(
    ['delete-group', '--user-pool-id', userPoolId, '--group-name', groupName],
    options
  );
  console.log(`Deleted group: ${groupName}`);
}

function ensureUserExists({ email, userPoolId, region, profile }) {
  const options = { region, profile };
  const exists = commandSucceeds(
    ['admin-get-user', '--user-pool-id', userPoolId, '--username', email],
    options
  );

  if (exists) {
    console.log(`User already exists: ${email}`);
    return;
  }

  runAwsCommand(
    [
      'admin-create-user',
      '--user-pool-id',
      userPoolId,
      '--username',
      email,
      '--message-action',
      'SUPPRESS',
      '--user-attributes',
      `Name=email,Value=${email}`,
      'Name=email_verified,Value=true',
    ],
    options
  );
  console.log(`Created user: ${email}`);
}

function setPermanentPassword({ email, password, userPoolId, region, profile }) {
  runAwsCommand(
    [
      'admin-set-user-password',
      '--user-pool-id',
      userPoolId,
      '--username',
      email,
      '--password',
      password,
      '--permanent',
    ],
    { region, profile }
  );
  console.log(`Set permanent password for: ${email}`);
}

function ensureUserInGroup({ email, groupName, userPoolId, region, profile }) {
  runAwsCommand(
    [
      'admin-add-user-to-group',
      '--user-pool-id',
      userPoolId,
      '--username',
      email,
      '--group-name',
      groupName,
    ],
    { region, profile }
  );
  console.log(`Added ${email} to group: ${groupName}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || args.h) {
    printUsage();
    process.exit(0);
  }

  if (!args.email || !args.password) {
    printUsage();
    process.exit(1);
  }

  const authConfig = resolveAuthConfig();
  const userPoolIdOverride =
    typeof args['user-pool-id'] === 'string' ? args['user-pool-id'] : undefined;
  const regionOverride =
    typeof args.region === 'string' ? args.region : undefined;
  const userPoolId = userPoolIdOverride || authConfig.userPoolId;
  const region = regionOverride || authConfig.region;
  const groupName = args.group || DEFAULT_GROUP_NAME;
  const profile = typeof args.profile === 'string' ? args.profile : undefined;
  const email = args.email;
  const password = args.password;
  const resetGroup = Boolean(args['reset-group']);

  console.log(`Using user pool: ${userPoolId}`);
  console.log(`Using region: ${region}`);
  if (!userPoolIdOverride && !regionOverride) {
    console.log(`Resolved auth config from: ${authConfig.source}`);
  }
  if (profile) {
    console.log(`Using AWS profile: ${profile}`);
  }

  try {
    if (resetGroup) {
      deleteGroupIfExists({ groupName, userPoolId, region, profile });
    }

    ensureGroupExists({ groupName, userPoolId, region, profile });
    ensureUserExists({ email, userPoolId, region, profile });
    setPermanentPassword({ email, password, userPoolId, region, profile });
    ensureUserInGroup({ email, groupName, userPoolId, region, profile });

    console.log('');
    console.log('Admin user is ready.');
    console.log(`Email: ${email}`);
    console.log(`Group: ${groupName}`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error while creating admin user';

    console.error(message);
    process.exit(1);
  }
}

main();
