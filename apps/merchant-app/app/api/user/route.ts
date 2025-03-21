import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/index";

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "asd",
            name: "adsads",
            number:"888888888",
            password:"45667"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}