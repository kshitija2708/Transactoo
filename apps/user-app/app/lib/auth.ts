import { PrismaClient } from "@repo/db/index";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

const db = new PrismaClient();

export const authOptions = {
  providers: [
   
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

   
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

   
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const existingUser = await db.user.findUnique({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              phone: existingUser.number,
            };
          }
          return null;
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },

  callbacks: {
    
    async signIn({ user, account }:{user:any; account:any}) {
      if (account?.provider === "google" || account?.provider === "github") {
        let existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // 🔹 Create new user if not found
          console.log(existingUser)
          existingUser = await db.user.create({
            data: {
                
              name: user.name,
              email: user.email,
              number:"",
              password:"",
              googleId: account.provider === "google" ? user.id : null,
              githubId: account.provider === "github" ? user.id : null
              
            },
          });
console.log(existingUser)
          await db.balance.create({
            data: { userId: Number(existingUser.id), amount: Math.random() * 1000, locked: 0 },
          });
        }
        else {
            // 🔹 Update existing user with provider ID (if missing)
            await db.user.update({
              where: { email: user.email },
              data: {
                googleId: account.provider === "google" ? account.id : existingUser.googleId,
                githubId: account.provider === "github" ? account.id : existingUser.githubId,
              },
            });
          }
        console.log("Existing User:", existingUser);
        if (!existingUser) console.log("Creating a new user:", user.email);
        
        return true;
      }

      return true; 
    },
    
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
