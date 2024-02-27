import { Config } from "drizzle-kit";

export default {
  schema: "./lib/database/schema.ts",
  out: "./lib/database/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
