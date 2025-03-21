"use server"
import {PrismaClient} from "@repo/db/index"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
const prisma=new PrismaClient();

export async function createOnRampTransactions(amount:number,provider:string){
   const session=await getServerSession(authOptions)

   const token=(Math.random()*1000).toString()
   if(!session?.user || !session.user?.id){
    return {
        message:"User not logged in"
    }
   }
   await  prisma.onRampTransaction.create({
    data:{
        userId: Number(session?.user?.id),
amount,
status:"Processing",
startTime:new Date(),
provider,
token:token


    }
   })

   return{
    message:"On ramp Transaction added"
   }

}

