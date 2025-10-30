export const appConfig = () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || 'api',
  apiVersion: process.env.API_VERSION || 'v1',

  database: {
    url: process.env.DATABASE_URL,
  },

  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT || '100', 10),
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined',
    dir: process.env.LOG_DIR || 'logs',
    errorLog: process.env.ERROR_LOG || 'error-%DATE%.log',
    combinedLog: process.env.COMBINED_LOG || 'combined-%DATE%.log',
    maxFiles: process.env.MAX_FILES || '30d',
    maxSize: process.env.MAX_SIZE || '20m',
  },

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },

  swagger: {
    path: process.env.SWAGGER_PATH || 'docs',
    title: process.env.SWAGGER_TITLE || 'NestJS Pro API',
    description:
      process.env.SWAGGER_DESCRIPTION || 'Enterprise-grade NestJS API',
    version: process.env.SWAGGER_VERSION || '1.0',
  },
});
