/* eslint-disable prettier/prettier */
import { Response, NextFunction, Request } from "express";
import {
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from "routing-controllers";
import passport, { AuthenticateOptions } from "passport";
import { googleStrategy } from "@/configs/passport";
import config from "@/configs";
passport.serializeUser((user, done: Function) => process.nextTick(() => done(null, user)));

passport.deserializeUser((user, done: any) => {
  process.nextTick(() => done(null, user));
});

interface ExtendedAuthenticateOptions extends AuthenticateOptions {
  accessType?: string;
  authType?: string;
  includeGrantedScopes?: boolean;
}

const authOptions: ExtendedAuthenticateOptions = {
  authType: 'rerequest',
  accessType: 'offline',
  prompt: 'consent',
  includeGrantedScopes: true,
  scope: ['email', 'profile', 'openid']
};

export class Authenticate implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): any {
    passport.use(googleStrategy);
    // passport.authenticate("google", 
    // {
    //   scope: [
    //     "https://www.googleapis.com/auth/userinfo.profile",
    //     "https://www.googleapis.com/auth/userinfo.email",
    //   ],
    // })(req, res, next);
    passport.authenticate("google",authOptions)(req, res, next);
  }
}

export class GoogleAuthentication implements ExpressMiddlewareInterface {
  authenticate = (callback: any) => 
    passport.authenticate(
      "google",
      { failureRedirect:`${config.urlHost}`, session: false },
      callback
    );
    

  use(req: Request | any, res: Response, next: NextFunction): any {
    return this.authenticate((err: any, user: any, info: any) => {
      if (err || !user) {
        return res.redirect(`${config.urlHost}`);
        // return res
        // return next(new UnauthorizedError(info));
      }

      req.user = user;
      return next();
    })(req, res, next);
  }
}
