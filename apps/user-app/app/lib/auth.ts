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
        name: { label: "Name", type: "text", placeholder: "John Doe" },
        email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials.phone || !credentials.password) {
            throw new Error("Phone and Password are required.");
          }

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

          
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
              name: credentials.name || "",
              email: credentials.email || "",
            },
          });

          await db.balance.create({
            data: { userId: newUser.id, amount: Math.random() * 1000, locked: 0 },
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.email,
            phone: newUser.number,
          };
        } catch (err) {
          console.error("Error in authorize():", err);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          let existingUser = await db.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            existingUser = await db.user.create({
              data: {
                name: user.name || "",
                email: user.email || "",
                number: "", // no phone number for OAuth users
                password: "", // no password for OAuth users
              },
            });

            await db.balance.create({
              data: { userId: existingUser.id, amount: Math.random() * 1000, locked: 0 },
            });
          }

          return true;
        } catch (err) {
          console.error(" Error in signIn callback:", err);
          return false;
        }
      }
      return true;
    },

    async session({ token, session }: any) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
