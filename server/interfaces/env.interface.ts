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
}
