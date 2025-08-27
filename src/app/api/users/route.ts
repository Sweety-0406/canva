import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;

    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });
    if(!user){
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({data:user}, {status:200})


  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}