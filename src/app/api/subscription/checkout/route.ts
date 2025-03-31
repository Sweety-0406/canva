import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";



export async function POST(req : Request) {
    try {
        const authSession = await auth()
        if(!authSession?.user || !authSession?.user?.id || !authSession?.user?.email) {
            return NextResponse.json({error:"Unathorized"},{status: 401})
        }
        const userId = authSession.user.id
        const email = authSession.user.email
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=1`,
            payment_method_types: ['card'],
            mode: "subscription",
            billing_address_collection: "required",
            customer_email: email,
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
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