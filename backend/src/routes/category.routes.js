import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middlewares/authMiddleware.js";

const prisma = new PrismaClient();
const router = Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const { type } = req.query;
    const where = type ? { type } : {};
    const categories = await prisma.category.findMany({ where, orderBy: { name: "asc" } });
    res.json({ categories });
  } catch (err) { next(err); }
});

export default router;