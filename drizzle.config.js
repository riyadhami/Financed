import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./utils/schema.jsx",
    out: "./drizzle",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_ZTt86jncaoGk@ep-soft-cake-a16flyhp.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
    },
});