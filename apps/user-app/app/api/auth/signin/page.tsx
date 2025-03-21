"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Sign in to Your Account</h2>

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
          className="w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-lg mt-4"
        >
          Sign in
        </button>

        <p className="my-4">or</p>

        {/* Google Sign-In */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-red-500 hover:bg-red-700 text-white p-3 rounded-lg mt-2"
        >
          Sign in with Google
        </button>

        {/* GitHub Sign-In */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg mt-2"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
