import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/index"; // Adjust the import as per your setup
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const transfers = await prisma.transferP2P.findMany({
            where: {
                OR: [
                    { fromUserId: Number(session.user.id) },
                    { toUserId: Number(session.user.id) },
                ],
            },
            
            select: { 
                id: true,
                amount: true,
                timestamp: true,
                fromUserId: true,
                toUserId: true,
                transactionId: true, 
                fromUser: { select: { name: true, email: true } },
                toUser: { select: { name: true, email: true } },
            },
            orderBy: { timestamp: "desc" },
        });

        return NextResponse.json(transfers);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch transfers" }, { status: 500 });
    }
}
