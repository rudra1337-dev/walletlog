import * as authService from "../services/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export async function signupController(req, res, next) {
  try {
    const { token, user } = await authService.signup(req.body);
    res.cookie("token", token, cookieOptions).status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

export async function loginController(req, res, next) {
  try {
    const { token, user } = await authService.login(req.body);
    res.cookie("token", token, cookieOptions).json({ user });
  } catch (err) {
    next(err);
  }
}

// Logout
export function logoutController(req, res) {
  res.clearCookie("token").json({ message: "Logged out" });
}