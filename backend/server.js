import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import passport from "./src/config/passport.js";
import transactionRoutes from "./src/routes/transaction.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import categoryRoutes from "./src/routes/category.routes.js";
import analyticsRoutes from "./src/routes/analytics.routes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS || "").split(","),
]
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS === "true";

app.set("trust proxy", 1);
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    let hostname = "";
    try {
      hostname = new URL(origin).hostname;
    } catch {
      return callback(new Error(`Origin ${origin} is not a valid URL`));
    }

    const isAllowedOrigin = allowedOrigins.includes(origin);
    const isVercelPreview = allowVercelPreviews && /\.vercel\.app$/.test(hostname);

    if (isAllowedOrigin || isVercelPreview) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/analytics", analyticsRoutes);


app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
