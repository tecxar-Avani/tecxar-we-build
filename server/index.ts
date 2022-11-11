import config from "@configs";
import {
  useExpressServer,
  getMetadataArgsStorage,
  Action,
  UnauthorizedError,
} from "routing-controllers";
import { importClassesFromDirectories } from "@utils/util";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import DB from "@databases";
import { logger } from "@utils/logger";

import express from "express";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";
import path from "path";
import passport from "passport";
import session from "express-session";

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  private controllerPath: string[] = [
    path.resolve(__dirname, "./controllers/*"),
  ];

  constructor() {
    this.app = express();
    this.port = config.app.port || 3000;
    this.env = process.env.NODE_ENV || "development";

    this.app.use(express.static(path.join(__dirname, "/../public")));
    this.connectToDatabase();
    this.initializeRoutes();
    // this.initializeSwagger();
    //    this.app.use(
    //      session({
    //        secret: config.jwt.secret,
    //        resave: false,
    //        saveUninitialized: true,
    //        name: "session",
    //        store: new sessionStore({
    //          db: this.db.sequelize,
    //          expiration: 60 * 60 * 100000,
    //        }),
    //        // cookie: { secure: false, maxAge: 60 * 60 * 100000 },
    //        // cookie: { secure: true, maxAge: 60 * 60 * 100000 },
    //      })
    //    );
       passport.serializeUser(function (user, done) {
         done(null, user);
       });

       passport.deserializeUser(function (user, done) {
         done(null, user);
       });}

  public listen() {
    return new Promise((resolve, reject) => {
      try {
        this.app.listen(this.port, () => {
          logger.info(`=================================`);
          logger.info(`======= ENV: ${this.env} =======`);
          logger.info(`🚀 App listening on the port ${this.port}`);
          logger.info(`=================================`);
          resolve(true);
        });
      } catch (error) {
        logger.error(error);
        reject(false);
      }
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    DB.sequelize.sync({ force: false });
  }

  private initializeRoutes() {
    useExpressServer(this.app, {
      cors: {
        origin: config.cors.enabled,
        credentials: config.cors.credentials,
      },
      authorizationChecker: async (action: Action, roles: string[]) => {
        if (action.request.isAuthenticated()) {
          return true;
        } else {
          throw new UnauthorizedError("You're not authorized");
        }
      },
      controllers: this.controllerPath,
      defaultErrorHandler: false,
      validation: true,
      routePrefix: config.apiPrefix,
    });
  }



  private initializeSwagger() {
    if (config.swagger.enabled) {
      logger.info(`Mounting Swagger App`);
      const {
        defaultMetadataStorage,
      } = require("class-transformer/cjs/storage");

      const schemas = validationMetadatasToSchemas({
        classTransformerMetadataStorage: defaultMetadataStorage,
        refPointerPrefix: "#/components/schemas/",
      });

      const routingControllersOptions = {
        controllers: importClassesFromDirectories(this.controllerPath),
      };

      const storage = getMetadataArgsStorage();
      const spec = routingControllersToSpec(
        storage,
        routingControllersOptions,
        {
          components: {
            schemas,
            securitySchemes: {
              basicAuth: {
                scheme: "basic",
                type: "http",
              },
            },
          },
          info: {
            description: config.app.description,
            title: config.app.name,
            version: config.app.version,
          },
        }
      );

      this.app.use(config.swagger.path, swaggerUi.serve, swaggerUi.setup(spec));
    }
  }
}

export default new App();
