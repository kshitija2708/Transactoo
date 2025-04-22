import { NextRequest,NextResponse } from "next/server";
import Razorpay from "razorpay";
const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_CLIENT_ID!,
    key_secret:process.env.RAZORPAY_CLIENT_SECRET!,
});
console.log(process.env.RAZORPAY_CLIENT_ID + "  "+process.env.RAZORPAY_CLIENT_SECRET )
export async function POST(request:NextRequest){
    try{
        const body=await request.json();
        const {amount}=body;
        const order=await razorpay.orders.create({
            amount:amount*100,
            currency:"INR",
            receipt:"receipt_"+Math.random().toString(36).substring(7),
        })
        return NextResponse.json({orderId:order.id},{status:200});
    }
    catch(error){
        console.error("Error sending money",error);
        return NextResponse.json({
            error:"Errror sending money"
        },{
            status:500
        })
    }
}