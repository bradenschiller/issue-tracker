import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";
import { issue } from "../../../lib/schema";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    console.log("running error");
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await db
    .insert(issue)
    .values({ title: body.title, description: body.description });

  return NextResponse.json(newIssue, { status: 201 });
}
