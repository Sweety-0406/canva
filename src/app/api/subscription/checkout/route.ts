import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const authSession = await auth()
        const { pay } = await req.json();
        if(!authSession?.user || !authSession?.user?.id || !authSession?.user?.email) {
            return NextResponse.json({error:"Unathorized"},{status: 401})
        }
        const userId = authSession.user.id
        const email = authSession.user.email
        const priceId = pay === "yearly" ? process.env.STRIPE_PRICE_ID_YEARLY : process.env.STRIPE_PRICE_ID_MONTHLY;
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=1`,
            payment_method_types: ['card'],
            mode: "subscription",
            billing_address_collection: "required",
            customer_email: email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            metadata:{
                userId: userId
            }
        })

        const url = session.url 
        if(!url){
            return NextResponse.json({error: "Failed to create session"}, {status: 400})
        }

        
        return NextResponse.json({data: url})

    } catch (error) {
        console.error("Register API Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}