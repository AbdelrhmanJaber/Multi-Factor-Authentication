import bcrypt from "bcryptjs";
import User from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

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

export const logout = async (req, res) => {
  if (!req.user) res.status(401).json({ message: "unauthorized user" });
  req.logout((err) => {
    if (err) res.status(400).json({ message: "user is not logged in" });
    res.status(200).json({ message: "Logout Successfully" });
  });
};

export const setup = async (req, res) => {
  try {
    console.log("req.user is : ", req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("the secret object is : ", secret);
    user.twoFactorSector = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.email}`,
      issuer: "www.dipeshmalvia.com",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Error setting up user", message: `${err}` });
  }
};

export const verify = async (req, res) => {
  const { token } = req.body;
  const user = req.user;
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSector,
    encoding: "base32",
    token,
  });
  if (verified) {
    const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(200).json({ message: "FA is successful", token: jwtToken });
  } else {
    res.status(400).json({ message: "invalid 2FA token" });
  }
};

export const reset = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSector = "";
    user.isMfaActive = false;
    await user.save();
    res.status(200).json({ message: "2FA is reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "invalid 2FA reset", message: error });
  }
};
