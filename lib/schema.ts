import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const issue = pgTable("issue", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  status: text("status", { enum: ["OPEN", "IN_PROGRESS", "CLOSED"] }).default(
    "OPEN"
  ),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
