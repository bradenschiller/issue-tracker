import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { issue, createIssueSchema } from "../../../lib/schema";

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, {
  schema: { issue, createIssueSchema },
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await db
    .insert(issue)
    .values({ title: body.title, description: body.description });

  return NextResponse.json(newIssue, { status: 201 });
}
