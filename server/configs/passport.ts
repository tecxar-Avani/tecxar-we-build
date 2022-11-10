import config from 'configs/index';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

export const googleStrategy = new GoogleStrategy(
  {
   
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
  },
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  },
);
