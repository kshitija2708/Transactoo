"use client";
import React,{useState} from "react";
import Script from "next/script"
import Email from "next-auth/providers/email";

declare global{
    interface Window{
        Razorpay:any
    }
}

export default function(){
    const [amount,setAmount]=useState(0);
    const[isProcessing,setIsProcessing]=useState(false)
   
    const handlePayment=async ()=>{
        setIsProcessing(true);
        try{
            const response =await fetch('/api/create-order',{method:"POST",body:JSON.stringify({amount})})
            const data=await response.json();
           
              
            const options={
                key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                name:"Transactoo",
                description:"TRANSACTION",
                order_id:data.orderId,
                handler:function(response:any){
                    console.log("Payment Successful",response)
                },
                prefill:{
                    name:"John Doe",
                    email:"johndoe@example.com",
                    contact:"8888610122"
                },
                theme:{
                    color: "#800080"
                }
                        }
                       

                        const rzp1=new window.Razorpay(options);
                        rzp1.open();

        }
       

    
    catch(error){
        console.error("PAYMENT FAILE",error)
    }
    finally{
        setIsProcessing(false)
    }
    }
    return (
        <div className="flex flex-col justify-center items-center w-full">
          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
          <div className="flex justify-center">
            <div className="flex flex-col gap-4 bg-[#111111] border border-purple-400 rounded-2xl shadow-lg shadow-purple-300 p-6 w-80">
              <h1 className="text-xl text-white border-b pb-2">Pay</h1>
      
              <label className="text-white">Enter the amount to Pay</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="px-3 py-2 rounded text-black"
              />
      
              <button
                className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay"}
              </button>
            </div>
          </div>
        </div>
      );
      

    }