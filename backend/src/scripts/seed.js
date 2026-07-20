import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { seedPage } from "../data/seedPage.js";
import { Page } from "../models/Page.js";
import { User } from "../models/User.js";

async function seed() {
  await connectDatabase();

  const passwordHash = await User.hashPassword(env.adminPassword);

  await User.findOneAndUpdate(
    { email: env.adminEmail },
    {
      name: env.adminName,
      email: env.adminEmail,
      passwordHash,
      role: "admin"
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await Page.findOneAndUpdate(
    { slug: seedPage.slug },
    seedPage,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Seeded admin ${env.adminEmail} and page /standards/${seedPage.slug}`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
