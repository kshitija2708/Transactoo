"use client"
import { Button } from "@repo/ui/button";
import { useRouter } from 'next/navigation'
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Home(){
    const router=useRouter()
    const session=useSession()
    return(
       <>
        
  
        <div className="flex flex-col justify-center items-center h-screen bg-black">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800 bg-clip-text text-transparent pb-10 translate-x-2">Unlock Easy Payments,Unlock Your time.</div>
            <div className="text-3xl font-bold bg-gradient-to-l from-purple-200 via-purple-400 to-purple-800 bg-clip-text text-transparent pb-10">Your Wallet awaits</div>
            <Button  onClick={()=>{
                router.push('/api/auth/signin')}
            }
            >SignIn to Pay</Button></div></> 
    )
}