import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { subscriptions } from "@/db/schema";
import { checkIsActive } from "@/lib/checkIsActive";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;

    const [subscription] = await db.select().from(subscriptions).where(
      eq(subscriptions.userId, userId)
    )
    const active = checkIsActive(subscription)
    return NextResponse.json({data: {...subscription, active}});

  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}