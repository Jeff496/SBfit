require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

const passportConfig = [passport.initialize(), passport.session()];

passport.serializeUser((user, done) => {
  console.log("serialize", user.id);
  done(null, user.id);
});

passport.deserializeUser(async (user, done) => {
  try {
    const foundUser = await User.findById(user);
    done(null, foundUser);
  } catch (err) {
    console.log("deserializeUser error: ", err);
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log("user", user);
        console.log("profile", profile);

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
          });
          console.log("userMade", user);
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = { passportConfig, passport };
