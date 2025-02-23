import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt, { compare } from "bcryptjs";
import User from "../models/user.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "user is not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return done(null, user);
        else return done(null, false, { message: "password is wrong" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
