import { Response, NextFunction, Request } from "express";
import {
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from "routing-controllers";
import passport from "passport";
import { googleStrategy } from "configs/passport";
import { ICreateUser, IFailedResponse } from "@/interfaces/users.interface";
import { logger } from "@/utils/logger";

export class Authenticate implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): any {
    passport.use(googleStrategy);
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    })(req, res, next);
  }
}

export class GoogleAuthentication implements ExpressMiddlewareInterface {
  // authenticate = (callback: {
  //   (err: { message: any }, user: ICreateUser): void;
  //   (...args: any[]): any;
  // }) =>
  //   passport.authenticate(
  //     "local",
  //     { session: true, failureRedirect: "/", failureMessage: true },
  //     callback
  //   ); /* eslint-disable-line */

  // use(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ): Promise<passport.Authenticator> {
  //   return this.authenticate((err: { message: any }, user: ICreateUser) => {
  //     if (err || !user) {
  //       logger.info("Unauthorized access");
  //       // const error: IFailedResponse = {
  //       //   status: false,
  //       //   error: err,
  //       //   message: 'failed to login',
  //       // };
  //       const error: IFailedResponse = {
  //         error: {
  //           title: "failed to login",
  //           message: err.message,
  //         },
  //         status: false,
  //       };
  //       return next(error);
  //     }
  //     return request.logIn(user, next);
  //   })(request, response, next);
  // }
  //******************** */
  // authenticate = (callback: {
  //   (err: { message: any }, user: ICreateUser): void;
  //   (...args: any[]): any;
  // }) =>
  //   passport.authenticate(
  //     "google",
  //     { failureRedirect: "/google_fail", session: false },
  //     callback
  //   );

  // use(request: Request, response: Response, next: NextFunction): any {
  //   return this.authenticate((err: { message: any }, user: ICreateUser) => {
  //     if (err || !user) {
  //       logger.info("Unauthorized access");
  //       const error: IFailedResponse = {
  //         error: {
  //           title: "failed to login",
  //           message: err.message,
  //         },
  //         status: false,
  //       };
  //       return next(error);
  //     }

  //     return request.logIn(user, next);
  //   })(request, response, next);
  // }

  authenticate = (callback: any) =>
    passport.authenticate(
      "google",
      { failureRedirect: "/google_fail", session: false },
      callback
    );

  use(req: Request | any, res: Response, next: NextFunction): any {
    return this.authenticate((err: any, user: any, info: any) => {
      if (err || !user) {
        return next(new UnauthorizedError(info));
      }

      req.user = user;
      return next();
    })(req, res, next);
  }
}
