import { Router } from "express";
import { signupController, loginController, logoutController } from "../controllers/auth.controller.js";
import { validate, signupSchema, loginSchema } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { PrismaClient } from "@prisma/client";
import passport from "../config/passport.js";
import { signToken } from "../utils/jwt.js";
import { authCookieOptions } from "../utils/authCookie.js";

const prisma = new PrismaClient();
const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    const token = signToken({ userId: req.user.id });
    res.cookie("token", token, authCookieOptions).redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

router.post("/signup", validate(signupSchema), signupController);
router.post("/login", validate(loginSchema), loginController);
router.post("/logout", logoutController);

router.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, email: true, authProvider: true },
  });
  res.json({ user });
});

export default router;
