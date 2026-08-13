import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { getSummary, getByCategory, getMonthly, getTrend } from "../services/analytics.service.js";

const router = Router();
router.use(requireAuth);

router.get("/summary", async (req, res, next) => {
  try {
    res.json(await getSummary(req.userId));
  } catch (err) { next(err); }
});

router.get("/by-category", async (req, res, next) => {
  try {
    res.json({ data: await getByCategory(req.userId) });
  } catch (err) { next(err); }
});

router.get("/monthly", async (req, res, next) => {
  try {
    res.json({ data: await getMonthly(req.userId) });
  } catch (err) { next(err); }
});

router.get("/trend", async (req, res, next) => {
  try {
    res.json({ data: await getTrend(req.userId) });
  } catch (err) { next(err); }
});

export default router;