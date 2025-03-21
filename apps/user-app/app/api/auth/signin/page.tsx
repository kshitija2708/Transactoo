"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
// @ts-ignore

import {FcGoogle} from "react-icons/fc"
import { Github } from "lucide-react";
// import Google from "next-auth/providers/google";

export default function SignInPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const res = await signIn("credentials", {
      phone,
      password,
      redirect: false, // Set to false for debugging
    });

    if (res?.error) {
      alert("Invalid credentials");
    } else {
      window.location.href = "/dashboard"; // Redirect manually
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111111]">
      <div className="bg-[#000000] p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl  text-white font-bold mb-6">Sign in to Your Account</h2>

        {/* Phone + Password Sign-In */}
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-lg mt-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg mt-3"
        />

        <button
          onClick={handleSignIn}
          className="w-full bg-purple-800 hover:bg-purple-700 text-white p-3 rounded-lg mt-4"
        >
          Sign in
        </button>

        <p className=" text-white font-bold text-md my-4">or</p>

        {/* Google Sign-In */}
        <div className="flex justify-center">
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-purple-500 hover:bg-purple-700 text-white p-3 rounded-lg mt-2 flex items-center gap-8"
        >
        <FcGoogle className="text-white w-6 h-6 ml-8"/>
         <span> Sign in with Google</span>
        </button>
        </div>
        {/* GitHub Sign-In */}
        <div className="flex justify-center">
            
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full bg-purple-800 hover:bg-purple-900 text-white p-3 rounded-lg mt-2 flex items-center gap-4"
        ><Github className="text-white w-6 h-6 ml-8"/>
    <span> Sign in with GitHub</span>
        </button></div>
      </div>
    </div>
  );
}
