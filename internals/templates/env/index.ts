import { EnvironmentVariables } from './types';

/**
 * Use this helper function to load environment-specific variables.
 *
 * Warning: DO NOT store sensitive information (such as secrets and
 * passwords) here as an environment variable, or anywhere on the
 * frontend. Frontend code can be viewed by anyone. If you need to
 * use secret values, these should be retrieved from a backend server.
 */
export default async () => {
  // Import the appropriate module based on environment
  const env = await import(`./configs/${process.env.NODE_ENV}`);
  return env.default as EnvironmentVariables;
};
