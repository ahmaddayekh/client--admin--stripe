

import db from "@/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./_components/checkoutForm"



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)


export default async function PurchasePage(
        
    {

    params: { id },

}: { 
    params: { id : string } 
}) {
    const product = await db.product.findUnique({
        where: { id }
    })
    if (product == null) return notFound()

    const paymentIntents = await stripe.paymentIntents.create({
        amount: product.priceInCents,
        currency: "usd",
        metadata: { productId: product.id }
    })

    if (paymentIntents.client_secret == null) {
        throw Error("Stripe Failed To Create Payment Intent")
    }



    return <CheckoutForm product={product} clientSecret={paymentIntents.client_secret} />
    
}