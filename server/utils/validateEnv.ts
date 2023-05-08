import { bool, cleanEnv, num, port, str } from "envalid";

function validateEnv() {
  return cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DB_HOSTNAME: str(),
    DB_DIALECT: str({
      choices: ["mysql", "postgres", "sqlite", "mariadb", "mssql"],
    }),
    DB_PORT: port(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
    DB_POOLMin: num(),
    DB_POOLMax: num(),
    DB_LOGGING: bool(),
    API_PREFIX: str(),
    CORS_ENABLED: bool(),
    CORS_CREDENTIALS: bool(),
    logDir: str(),
    LOG_FORMAT: str(),
    USE_EXPRESS_STATUS_MONITOR: bool(),
    EXPRESS_STATUS_MONITOR_PATH: str(),
    ENABLE_SWAGGER: bool(),
    SWAGGER_ENDPOINT: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    GOOGLE_CALLBACK_URL: str(),
    API_KEY_USER: str(),
    YOUTUBE_APIKEY:str(),
    API_KEY: str(),
    APP_SECRET: str(),
    JWT_EXPIRES_IN: num(),
    URL_HOST:str()
  });
}

export default validateEnv;
