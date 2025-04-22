import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/index"; // Adjust the import as per your setup
import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();
export async function POST(req:NextRequest,{params}:{params:{participantId:string}}) {
      try {
            const session = await getServerSession(authOptions);
            if (!session || !session.user?.id) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            const {participantId}=params;
            const updated =await prisma.billParticipant.update({
                where:{id:parseInt(participantId)}
                ,
                data:{paid:true},
            });
            return NextResponse.json(updated);
        }catch(error){
            console.error(error);
            return NextResponse.json({error:"Failed to mark as paid"},{status:500})
        }}