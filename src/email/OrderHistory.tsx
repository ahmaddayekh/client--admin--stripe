
import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from "@react-email/components"
import { OrderInfomation } from "./components/OrderInformation"
import React from "react"


type OrderHistoryEmailProps = {
    orders: {
        id: string,
        priceInCents: number,
        createdAt: Date,
        downloadVerificationId: string,
        product: {
            name: string,
            imagePath: string
            description: string
        }
    }[]
}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            priceInCents: 10000,
            downloadVerificationId: crypto.randomUUID(),
            product: { name: "Product name", description: "some description", imagePath: "/products/5ea7559b-eaf7-46d9-a32e-c8429d2f2b52-computer.jpg", },
        },
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            priceInCents: 2000,
            downloadVerificationId: crypto.randomUUID(),
            product: { name: "Product name 2", description: "some description 2", imagePath: "/products/5ea7559b-eaf7-46d9-a32e-c8429d2f2b52-computer.jpg", },
        },

    ]
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
    return (
        <Html>
            <Preview>Order history & downloads</Preview>

            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-lg">
                        <Heading>Order history</Heading>
                        {orders.map((order, index) => (
                            <React.Fragment key={order.id}>
                                <OrderInfomation
                                    key={order.id}
                                    order={order}
                                    product={order.product}
                                    downloadVerficationId={order.downloadVerificationId}
                                />
                                {index < orders.length - 1 && <Hr />}
                            </React.Fragment>
                        ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}