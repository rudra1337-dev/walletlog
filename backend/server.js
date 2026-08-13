import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import passport from "./src/config/passport.js";
import transactionRoutes from "./src/routes/transaction.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import categoryRoutes from "./src/routes/category.routes.js";

dotenv.config();
const app = express();
app.use(errorHandler);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use(passport.initialize());

app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);


app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));