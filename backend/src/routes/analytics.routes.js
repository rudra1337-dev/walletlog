import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { getSummary } from "../services/analytics.service.js";

const router = Router();
router.use(requireAuth);

router.get("/summary", async (req, res, next) => {
  try {
    const summary = await getSummary(req.userId);
    res.json(summary);
  } catch (err) { next(err); }
});

export default router;