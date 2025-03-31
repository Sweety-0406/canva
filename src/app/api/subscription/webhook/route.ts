import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { subscriptions } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq, jaccardDistance } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";



export async function POST(req : Request) {
    const body = await req.text()
    const signature = req.headers.get("Stripe-Signature") as string

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        return NextResponse.json({error: "Invalid signature"}, {status:400})
    }
        
    const session = event.data.object as Stripe.Checkout.Session;
    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );

        if (!session?.metadata?.userId) {
            return NextResponse.json({ error: "Invalid session" }, {status: 400});
        }

        await db
            .insert(subscriptions)
            .values({
                status: subscription.status,
                userId: session.metadata.userId,
                subscriptionId: subscription.id,
                customerId: subscription.customer as string,
                priceId: subscription.items.data[0].price.product as string,
                currentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );

        if (!session?.metadata?.userId) {
            return NextResponse.json({ error: "Invalid session" }, {status: 400});
        }

        await db
            .update(subscriptions)
            .set({
                status: subscription.status,
                currentPeriodEnd: new Date(
                    subscription.current_period_end * 1000,
                ),
                updatedAt: new Date(),
            })
            .where(eq(subscriptions.id, subscription.id))
    } 

    return NextResponse.json({status: 200})

} 