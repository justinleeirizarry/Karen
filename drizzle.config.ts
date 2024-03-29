import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import type { Config } from "drizzle-kit"


export default {
  schema: "./db/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
