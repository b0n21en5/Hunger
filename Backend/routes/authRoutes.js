import express from "express";
import {
  loginController,
  registerNewUser,
  resetPasswordController,
} from "../controller/authController.js";

const router = express.Router();

// Register new user
router.post("/register-user", registerNewUser);

// Login existing user
router.post("/login", loginController);

// Reset Password
router.put("/reset-password", resetPasswordController);

export default router;
