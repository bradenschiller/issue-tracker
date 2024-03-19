import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
});

const issueSchema = createIssueSchema.extend({
  id: z.number(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

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

export type Issue = z.infer<typeof issueSchema>;
