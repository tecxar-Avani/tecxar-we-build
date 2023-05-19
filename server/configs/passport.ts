/* eslint-disable prettier/prettier */
import config from "@/configs/index";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import passport from "passport";

passport.serializeUser(function (user: any, done) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    // callbackURL: "https://webuild.tecxar.io/api/google_callback",
    callbackURL: `${config.urlHost}${config.google.callbackUrl}`,

    // callbackURL: config.google.callbackUrl,
  },
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
);
