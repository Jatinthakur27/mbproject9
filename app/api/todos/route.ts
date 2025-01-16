import db from "@/db";
import { todos, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fetchedTodos = await db
      .select()
      .from(todos)
      .innerJoin(users, eq(todos.createdBy, users.id))
      .execute();
    return new NextResponse(JSON.stringify(fetchedTodos), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, createdBy } = body;
    const fetchedUsers = await db
      .select()
      .from(users)
      .where(eq(users.kindeId, createdBy));

    const { id: userId } = fetchedUsers[0];
    const newTodo = {
      title,
      description: description || "",
      createdBy: userId,
    };

    const createdTodo = await db.insert(todos).values(newTodo).returning();

    return new NextResponse(JSON.stringify(createdTodo), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
