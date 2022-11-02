"use strict";

import User from "../Model/userModel.js";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    async function (email, password, done) {
      const user = await User.findOne({    email  });

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializing");

  done(null, user._id);
});

passport.deserializeUser(async function (_id, done) {
  const user = await User.findOne({  _id  });
  console.log('deserializing');
  console.log(user);

  done(null, user);
});

module.exports = passport;
