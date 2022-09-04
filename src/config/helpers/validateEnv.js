import { URL } from 'url';

export default (config) => {
  const requiredEnv = [
    'NODE_ENV',
    'NODE_PORT',
    'DB_HOST',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'AWS_REGION',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'S3_BUCKET',
    'COGNITO_POOL_ID',
    'COGNITO_CLIENT_ID',
    'FE_BASE_URL',
    'BE_BASE_URL',
    'GOOGLE_MAPS_API_KEY',
    'SNS_PLATFORM_APPLICATION_ARN',
    'CUSTOMER_COGNITO_POOL_ID',
    'CUSTOMER_COGNITO_CLIENT_ID',
    'CUSTOMER_PORTAL_BASE_URL',
    'TRUCKER_COGNITO_POOL_ID',
    'TRUCKER_COGNITO_CLIENT_ID',
    'TRUCKER_PORTAL_BASE_URL',
  ];
  const missingEnv = [];

  // Check if required env variables are provided
  requiredEnv.map((env) => {
    if (!(env in config)) missingEnv.push(env);
    if (env in config && !config[env]) missingEnv.push(env);
    return env;
  });

  // Validate one of the emailer credentials exists
  if (!config.NODEMAILER_EMAIL && !config.AWS_SES_SOURCE) {
    missingEnv.push(
      '[NODEMAILER_EMAIL, NODEMAILER_PASSWORD] OR [AWS_SES_SOURCE, AWS_SES_REGION]',
    );
  } else if (config.NODEMAILER_EMAIL && !config.NODEMAILER_PASSWORD) {
    missingEnv.push('NODEMAILER_PASSWORD');
  } else if (
    !config.NODEMAILER_EMAIL &&
    config.AWS_SES_SOURCE &&
    !config.AWS_SES_REGION
  ) {
    missingEnv.push('AWS_SES_REGION');
  }

  if (missingEnv.length) throw new Error(`Missing env: ${missingEnv.join()}`);

  // Validate url formats
  const keys = ['FE_BASE_URL', 'BE_BASE_URL', 'CUSTOMER_PORTAL_BASE_URL'];
  keys.map((key) => {
    // eslint-disable-next-line no-new
    new URL(config[key]);
    return key;
  });
};
