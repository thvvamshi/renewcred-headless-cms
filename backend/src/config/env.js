import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT || 4000),

  mongoUri: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",

  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    name: process.env.ADMIN_NAME,
  },

  corsOrigins: (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
