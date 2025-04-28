import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@repo/db/index";
// import { STATUS_CODES } from "http";
export async function POST(req:NextRequest) {

    try{
        const prisma=new PrismaClient();
    const {query}=await req.json();
    if(!query){
        return NextResponse.json({users:[]});
    }
    const users=await prisma.user.findMany({
        where:{
            OR:[
         {
          number:{contains:query}
        
         },{
            name:{contains:query,mode:"insensitive"}
         }
            ]
        },
        select:{id:true,name:true,number:true}
    });
return NextResponse.json({users})}
    catch(error){
        console.log("Not found");
        // NextResponse.json({})
    }
    
}