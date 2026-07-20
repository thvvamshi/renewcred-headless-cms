import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/auth.routes.js";
import { contentRouter } from "./routes/content.routes.js";

export const app = express();

const allowedOrigins = new Set(env.corsOrigins);

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without Origin (Postman, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRouter);

app.use(notFound);
app.use(errorHandler);
