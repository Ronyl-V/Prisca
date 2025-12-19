"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

export default function LoginWorkerPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log("Logging in...");
  };

  const isFormValid =
  email.trim() !== "" &&
  password.trim() !== "" ;


  const { openSignIn } = useClerk();

  return (
    <div className="min-h-screen w-full bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Login as a Service Provider
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={!isFormValid}
              onClick={() => openSignIn({ redirectUrl: "/home",})}
              className="bg-red-500 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-red-300 transition"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-red-500 font-medium hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
