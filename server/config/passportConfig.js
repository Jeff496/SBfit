require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

const passportConfig = [passport.initialize(), passport.session()];

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (user, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5173/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findById({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });
        }

        done(null, user);
      } catch {
        done(err, null);
      }
    }
  )
);

module.exports = { passportConfig, passport };
