import config from 'configs/index';
import { dbConfig } from '@interfaces/db.interface';
import { logger } from '@utils/logger';
import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';
import cluster from 'cluster';
import User from '@/models/user.model';
import Role from "@/models/roles.model";
import VideoBuild from "@/models/videoBuilds.model ";
import Box from "@/models/boxes.model";
import Group from "@/models/groups.model";
import FlashCards from "@/models/flashCards.model";
import BoxGroups from "@/models/boxGroups.model";
import BoxReviews from "@/models/boxReviews.model";

const { host, user, password, database, pool, port }: dbConfig = config.db;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  port: port,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: false,
    freezeTableName: true,
  },
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: config.isDev,
  logging: false,
  benchmark: true,
  models: [path.resolve(__dirname, '../models')],
  modelMatch: (filename: any, member: any) => {
    if (filename != 'index') {
      return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    } else {
      return false;
    }
  },
});

const umzugMigrations = new Umzug({
  migrations: { glob: path.join(__dirname, `../migrations/*.${config.isDev ? 'ts' : 'js'}`) },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger,
});

const umzugSeeders = new Umzug({
  migrations: { glob: path.join(__dirname, `../seeders/*.${config.isDev ? 'ts' : 'js'}`) },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger,
});

sequelize
  .authenticate()
  .then(() => {
    if (cluster.isPrimary) {
    }
    logger.info(`Connected to ${'My Sql'}, host: ${config.db.host}`);
  })
  .catch(err => {
    throw err;
  });

sequelize.afterBulkSync('afterSync', () => {
  // umzugMigrations.up();
  umzugSeeders.up(); // Don't open comment
});

const DB = {
  roles:Role,
  users:User,
  videoBuild:VideoBuild,
  box:Box,
  group:Group,
  boxGroups:BoxGroups,
  flashCards:FlashCards,
  boxReviews:BoxReviews,
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
