import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  getStatus,
  logout,
  setup,
  verify,
  reset,
} from "../controllers/authContoller.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(passport.authenticate("local"), login);
router.route("/status").get(getStatus);
router.route("/logout").post(logout);
router.route("/setup").post((req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "user is unauthorized" });
}, setup);
router.route("/verify").post((req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "user is unauthorized" });
}, verify);
router.route("/reset").post((req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "user is unauthorized" });
}, reset);

export default router;
