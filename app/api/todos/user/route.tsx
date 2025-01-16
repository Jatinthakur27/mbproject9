import db from "@/db";
import { todos, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { kindeId } = await req.json();
  const usersData = await db
    .select()
    .from(users)
    .where(eq(users.kindeId, kindeId));
  const { id: userId } = usersData[0];

  const todosData = await db
    .select()
    .from(todos)
    .where(eq(todos.createdBy, userId));

  return new NextResponse(JSON.stringify(todosData), { status: 200 });
}
