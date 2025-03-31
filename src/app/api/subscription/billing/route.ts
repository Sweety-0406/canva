import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { subscriptions } from "@/db/schema";
import { checkIsActive } from "@/lib/checkIsActive";
import { stripe } from "@/lib/stripe";
import { error } from "console";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userSession = await auth();
    if (!userSession?.user || !userSession?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = userSession.user.id;

    const [subscription] = await db.select().from(subscriptions).where(
        eq(subscriptions.userId, userId)
    )
    if(!subscription) {
        return NextResponse.json({error: "No subscription found"},{status:404})
    }
    const session = await stripe.billingPortal.sessions.create({
        customer: subscription.customerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}`
    })
    if(!session.url){
        return NextResponse.json({error: "Failed to create session"},{status:404})
    }
    return NextResponse.json({data: session.url});

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}