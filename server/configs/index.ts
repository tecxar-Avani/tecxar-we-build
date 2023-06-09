import { envConfig } from "@interfaces/env.interface";
import validateEnv from "@utils/validateEnv";
import project from "../../package.json";

import "dotenv/config";

const env = validateEnv();

const config: envConfig = {
  isProduction: env.isProduction || env.isProd,
  isDev: env.isDev || env.isDevelopment,
  isTest: env.isTest,
  app: {
    name: project.name,
    description: project.description,
    version: project.version,
    port: env.PORT,
  },
  swagger: {
    enabled: env.ENABLE_SWAGGER,
    path: env.SWAGGER_ENDPOINT,
  },

  db: {
    host: env.DB_HOSTNAME,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: env.DB_PORT,
    logging: env.DB_LOGGING,
    dialect: env.DB_DIALECT,
    pool: {
      max: env.DB_POOLMax,
      min: env.DB_POOLMin,
    },
  },

  apiPrefix: env.API_PREFIX,

  cors: {
    enabled: env.CORS_ENABLED,
    credentials: env.CORS_CREDENTIALS,
  },
  logs: {
    dir: env.logDir,
    format: env.LOG_FORMAT,
  },
  express: {
    useMonitor: env.USE_EXPRESS_STATUS_MONITOR,
    monitorPath: env.EXPRESS_STATUS_MONITOR_PATH,
  },
  google: {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackUrl: env.GOOGLE_CALLBACK_URL,
  },
  apiKey: env.API_KEY,
  apiKeyUser: env.API_KEY_USER,
  youtubeApiKey:env.YOUTUBE_APIKEY,
  jwt: {
    secret: env.APP_SECRET,
    expiry: env.JWT_EXPIRES_IN,
  },
  urlHost: env.URL_HOST,
};

export default config;
