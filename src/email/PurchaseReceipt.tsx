
import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components"
import { OrderInfomation } from "./components/OrderInformation"


type PurchaseReceiptEmailProps = {
    product: {
        name: string,
        imagePath : string
        description : string
    }
    order : {id : string , createdAt : Date, priceInCents : number}
    downloadVerificationId : string
}

PurchaseReceiptEmail.PreviewProps = {
    product : {name : "Product name" , description : "some description" ,imagePath : "/products/5ea7559b-eaf7-46d9-a32e-c8429d2f2b52-computer.jpg" ,},
    order : {
        id : crypto.randomUUID(),
        createdAt : new Date(),
        priceInCents : 10000, 
    },
    downloadVerificationId : crypto.randomUUID()
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({product , order, downloadVerificationId} : PurchaseReceiptEmailProps) {
    return (
        <Html>
            <Preview>Download {product.name} and view reciept</Preview>
            <Tailwind>
                <Head/>
                <Body className="font-sans bg-white">
                    <Container className="max-w-lg">
                        <Heading>Purchase Reciept</Heading>
                        <OrderInfomation 
                        order={order} 
                        product={product} 
                        downloadVerficationId={downloadVerificationId}
                        />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}