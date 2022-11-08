export interface dbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  logging:boolean;
  dialect:string;
  pool: {
    min: number;
    max: number;
  };
}
