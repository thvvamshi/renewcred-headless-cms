import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || process.env.BACKEND_PORT || 4000),
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/renewcred_cms",
  jwtSecret: process.env.JWT_SECRET || "local-dev-renewcred-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
  adminEmail: process.env.ADMIN_EMAIL || "admin@renewcred.local",
  adminPassword: process.env.ADMIN_PASSWORD || "ChangeMe123!",
  adminName: process.env.ADMIN_NAME || "RenewCred Admin",
  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
};
