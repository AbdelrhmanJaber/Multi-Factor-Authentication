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
router.route("/setup").post(setup);
router.route("/verify").post(verify);
router.route("/reset").post(reset);

export default router;
