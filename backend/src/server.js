import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

async function start() {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`Backend API listening on port ${env.port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
