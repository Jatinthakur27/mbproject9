import db from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const fetchedTodos = await db.select().from(todos).where(eq(todos.id, id));

    return new NextResponse(JSON.stringify(fetchedTodos), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
