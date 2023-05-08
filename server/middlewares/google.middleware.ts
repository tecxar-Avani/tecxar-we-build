/* eslint-disable prettier/prettier */
import { Response, NextFunction, Request } from "express";
import {
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from "routing-controllers";
import passport from "passport";
import { googleStrategy } from "@/configs/passport";
import config from "@/configs";

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
  authenticate = (callback: any) =>
    passport.authenticate(
      "google",
      { failureRedirect: "https://webuild.tecxar.io/", session: false },

      callback
    );

  use(req: Request | any, res: Response, next: NextFunction): any {
    return this.authenticate((err: any, user: any, info: any) => {
      if (err || !user) {
        return res.redirect(`https://webuild.tecxar.io/`);
        // return res
        // return next(new UnauthorizedError(info));
      }

      req.user = user;
      return next();
    })(req, res, next);
  }
}
