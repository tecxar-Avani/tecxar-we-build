import { dbConfig } from './db.interface';

export interface envConfig {
  isProduction: boolean;
  isDev: boolean;
  isTest: boolean;
  app: {
    name: string;
    version: string;
    description: string;
    port: number;
  };
  swagger: {
    enabled: boolean;
    path: string;
  };
  db: dbConfig;
  apiPrefix: string;
  cors: {
    enabled: boolean;
    credentials: boolean;
  };
  express: {
    useMonitor: boolean;
    monitorPath: string;
  };
  logs: {
    format: string;
    dir: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  apiKey: string;
  apiKeyUser: string;
  jwt: {
    secret: string;
    expiry: number;
  };
  urlHost: string;
}
