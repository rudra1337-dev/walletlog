import * as authService from "../services/auth.service.js";
import { authCookieOptions, clearAuthCookieOptions } from "../utils/authCookie.js";

export async function signupController(req, res, next) {
  try {
    const { token, user } = await authService.signup(req.body);
    res.cookie("token", token, authCookieOptions).status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

export async function loginController(req, res, next) {
  try {
    const { token, user } = await authService.login(req.body);
    res.cookie("token", token, authCookieOptions).json({ user });
  } catch (err) {
    next(err);
  }
}

// Logout
export function logoutController(req, res) {
  res.clearCookie("token", clearAuthCookieOptions).json({ message: "Logged out" });
}
