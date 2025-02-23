import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
      isMfaActive: false,
    });
    await newUser.save();
    res.status(201).json({ message: "User is created", data: { newUser } });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error registering user", message: `${err}` });
  }
};

export const login = async (req, res) => {
  res.status(200).json({
    message: "User logged in successfully",
    email: req.user.email,
    isMfaActive: req.user.isMfaActive,
  });
};

export const getStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      email: req.user.email,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "unauthorized user" });
  }
};

export const logout = async (req, res) => {};

export const setup = async (req, res) => {};

export const verify = async (req, res) => {};

export const reset = async (req, res) => {};
