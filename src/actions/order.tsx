"use server"

import db from "@/db/db";
import OrderHistoryEmail from "@/email/OrderHistory";
import { Resend } from "resend";
import { z } from "zod";


const emailSchema = z.string().email()
const resend = new Resend(process.env.RESEND_API_KEY as string)


export async function emailOrderHistory(prevState: unknown, formData: FormData): Promise<{ message?: string; error?: string }> {
    const result = emailSchema.safeParse(formData.get("email"))

    if (result.success === false) {
        return { error: " invalid email address" }
    }

    const user = await db.user.findFirst({ where: { email: result.data }, select: { email: true, orders: { select: { priceInCents: true, id: true, createdAt: true, product: { select: { id: true, name: true, imagePath: true, description: true } } } } } })

    if(user == null) {
        return{
            message : "Check your email to view your order history and download your products"
        }
    }

    const orders = user.orders.map(async order => {
        return {...order , downloadVerificationId : (await db.downloadVerfication.create({data : {
            expiresAt : new Date(Date.now() + 1000 * 60 * 60 * 24),productId : order.product.id
        }})).id}
    })

    const data = await resend.emails.create({
        from:`Support <${process.env.SENDER_EMAIL}>`,
        to : user.email,
        subject : "Order History",
        react : <OrderHistoryEmail orders={await Promise.all(orders)}/>
    })

    if(data.error){
        return{error:"there was an error sending your email please try again"}
    }


    return{ message : "Check your email to view your order history and download your products"}

}