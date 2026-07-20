export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, req, res, next) {
  console.error("========== ERROR ==========");
  console.error(error);
  console.error(error.stack);
  console.error("===========================");

  const statusCode = error.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
    ...(isProduction ? {} : { stack: error.stack }),
  });
}