import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/index"; // Adjust the import as per your setup
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();
export async function POST(req:NextRequest) {
      try {
            const session = await getServerSession(authOptions);
            if (!session || !session.user?.id) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            const {title,totalAmount,creatorId,participantsIds}=await req.json();
            const individualShare=Math.ceil(totalAmount/participantsIds.length)
            const bill=await prisma.bill.create({
                data:{
                    title,totalAmount,
                    createdBy:creatorId,participants:{
                        create:participantsIds.mao((userId:number)=>({
                            userId,
                            amount:individualShare
                        }))
                    }

                }
            })
            return NextResponse.json(bill,{status:201})
}
catch(error){
    console.error(error);
    return NextResponse.json({error:'Faile to create bill'},{status:500})
}
}