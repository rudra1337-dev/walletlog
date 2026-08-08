import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { signToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

// Signup
export async function signup({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error("Email already registered");
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, authProvider: "local" },
  });

  const token = signToken({ userId: user.id });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

// Login
export async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const token = signToken({ userId: user.id });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}