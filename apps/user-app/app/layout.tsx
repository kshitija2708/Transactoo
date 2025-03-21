import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "./components/AppbarClient";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

const inter = Inter({ subsets: ["latin"] });
const session = await getServerSession(authOptions);
export const metadata: Metadata = {
  title: "SwiftPay-User",
  description: "Simple Wallet Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      
      
        <body className={inter.className}><Providers>
        <AppbarClient/>{children}  </Providers></body>
    
    </html>
  );
}
