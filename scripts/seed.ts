import "dotenv/config";
import config from "../src/payload.config";
import { getPayload } from "payload";

async function seed() {
  const payload = await getPayload({ config });

  const existingUsers = await payload.find({
    collection: "users",
    limit: 1,
  });

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@jarkabi.ca",
        password: "ChangeMeNow123!",
        role: "super_admin",
        firstName: "Admin",
        lastName: "User",
      },
    });
    console.log("Created admin user: admin@jarkabi.ca / ChangeMeNow123!");
  }

  await payload.updateGlobal({
    slug: "brand-settings",
    data: {
      agencyName: "Jarkabi Home Care",
      email: "care@jarkabi.ca",
      websiteUrl: "https://jarkabi.ca",
    },
  });

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
