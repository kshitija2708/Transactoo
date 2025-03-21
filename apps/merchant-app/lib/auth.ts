import GoogleProvider from "next-auth/providers/google";
import {PrismaClient} from "@repo/db/index";
const db=new PrismaClient();
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: "63798047391-vcqludgvfrginp0alp99b86i9th1f1od.apps.googleusercontent.com",
            clientSecret: "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"
        })
    ],
    callbacks: {
      async signIn({ user, account }: {
        user: {
          email: string;
          name: string
        },
        account: {
          provider: "google" | "github"
        }
      }) {
        console.log("hi signin")
        if (!user || !user.email) {
          return false;
        }

        await db.merchant.upsert({
          select: {
            id: true
          },
          where: {
            email: user.email
          },
          create: {
            email: user.email,
            name: user.name,
            auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
          },
          update: {
            name: user.name,
            auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
          }
        });

        return true;
      }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
  }