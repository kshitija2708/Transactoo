"use client"
import { Button } from "@repo/ui/button";
import { useRouter } from 'next/navigation'

export default function Home(){
    const router=useRouter()
    return(
        <div className="flex flex-col justify-center items-center h-screen ">
            <div className="  text-3xl  pb-2">Unlock Easy Payments,Unlock Your time.</div>
            <div className="text-xl pb-3">Your Wallet awaits</div>
            <Button  onClick={()=>{
                router.push('/api/auth/signin')}
            }
            >Sign in to Pay</Button></div>
    )
}