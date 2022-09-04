import dotenv from 'dotenv';

import dbOptions from './dbOptions.json';

/**
 * Parse env variables from .env file
 */
const env = dotenv.config();
if (env.error) {
  /**
   * This error should crash whole process
   */
  throw new Error('[.env] file not found!');
}

/**
 * Sequelize database config
 */
export const dbConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  options: {
    ...dbOptions,
    host: process.env.DB_HOST,
  },
};

console.log('dbConfig', dbConfig);

/**
 * Node app config
 */
export const nodeConfig = {
  appName: 'pickerapp-backend',
  nodeEnv: process.env.NODE_ENV,
  nodePort: parseInt(process.env.NODE_PORT, 10),
  nodemailer_email: process.env.NODEMAILER_EMAIL,
  nodemailer_password: process.env.NODEMAILER_PASSWORD,
  aws_region: process.env.AWS_REGION,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  aws_ses_source: process.env.AWS_SES_SOURCE,
  aws_ses_region: process.env.AWS_SES_REGION,
  s3_bucket: process.env.S3_BUCKET,
  cognito_pool_id: process.env.COGNITO_POOL_ID,
  cognito_client_id: process.env.COGNITO_CLIENT_ID,
  identity_pool_id: process.env.IDENTITY_POOL_ID,
  fe_base_url: process.env.FE_BASE_URL,
  be_base_url: process.env.BE_BASE_URL,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
  google_maps_api_key: process.env.GOOGLE_MAPS_API_KEY,
  sns_platform_application_arn: process.env.SNS_PLATFORM_APPLICATION_ARN,
  customer_cognito_pool_id: process.env.CUSTOMER_COGNITO_POOL_ID,
  customer_cognito_client_id: process.env.CUSTOMER_COGNITO_CLIENT_ID,
  customer_portal_base_url: process.env.CUSTOMER_PORTAL_BASE_URL,
  trucker_cognito_pool_id: process.env.TRUCKER_COGNITO_POOL_ID,
  trucker_cognito_client_id: process.env.TRUCKER_COGNITO_CLIENT_ID,
  trucker_portal_base_url: process.env.TRUCKER_PORTAL_BASE_URL,
  use_ssl: process.env.USE_SSL === 'true',
  additional_allowed_origins: process.env.ADDITIONAL_ALLOWED_ORIGINS || '',
};

export default {
  dbConfig,
  nodeConfig,
};
