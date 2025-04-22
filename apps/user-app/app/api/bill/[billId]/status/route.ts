import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import { PrismaClient } from "@repo/db/index"; // Adjust the import as per your setup
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

       
            
export async function GET(_: NextRequest, { params }: { params: { billId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
       { return NextResponse.json({ error: "Unauthorized" }, { status: 401 });}
   const bill = await prisma.bill.findUnique({
      where: { id: parseInt(params.billId) },
      include: { participants: true },
    });

    const allPaid = bill?.participants.every((p) => p.paid);

    return NextResponse.json({ bill, allPaid });
  } }catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch bill status' }, { status: 500 });
  }
}
