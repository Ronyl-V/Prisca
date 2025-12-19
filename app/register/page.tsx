"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

const ClientRegisterPage = () => {
  const router = useRouter();

  // États pour inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { openSignIn } = useClerk();

  const isFormValid =
  name.trim() !== "" &&
  email.trim() !== "" &&
  password.trim() !== "";


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Optionnel : validation basique
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setError("");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-red-500 mb-6">
          Create Your Client Account
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Sign up to find and book professional services near you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-red-400">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full focus:outline-none bg-transparent"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-red-400">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full focus:outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-red-400">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full focus:outline-none bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            onClick={() => openSignIn({ redirectUrl: "/home",})}
            className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login/client" className="text-red-500 font-semibold hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ClientRegisterPage;
