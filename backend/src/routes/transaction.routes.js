import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { validate, transactionSchema, transactionUpdateSchema } from "../middlewares/validate.js";
import { create, list, getOne, update, remove } from "../controllers/transaction.controller.js";

const router = Router();
router.use(requireAuth); // every route below requires login

router.get("/", list);
router.get("/:id", getOne);
router.post("/", validate(transactionSchema), create);
router.put("/:id", validate(transactionUpdateSchema), update);
router.delete("/:id", remove);

export default router;