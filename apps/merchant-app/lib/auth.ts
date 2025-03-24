import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@repo/db/index";
import { NextAuthOptions } from "next-auth";

const db = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) { 
      console.log("hi signin");

      if (!user || !user.email) {
        return false;
      }

      await db.merchant.upsert({
        select: { id: true },
        where: { email: user.email },
        create: {
          email: user.email,
          name: user.name ?? "Unknown",
          auth_type: account?.provider === "google" ? "Google" : "Github",
        },
        update: {
          name: user.name ?? "Unknown",
          auth_type: account?.provider === "google" ? "Google" : "Github",
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
