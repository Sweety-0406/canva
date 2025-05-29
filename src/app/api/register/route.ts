
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import bcrypt from "bcryptjs";
import {users} from "@/db/schema"
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
        return NextResponse.json({ error: "Email is already registered" }, { status: 422 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await db.insert(users).values({
        email,
        name,
        hashedPassword,
    }).returning();

    return NextResponse.json({ message: "User created successfully", user }, { status: 200 });
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
