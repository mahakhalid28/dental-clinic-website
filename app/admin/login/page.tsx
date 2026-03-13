"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        window.location.href = "/admin";
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A2342 0%, #0D2B4D 50%, #0A2342 100%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #BFA37C 0%, transparent 60%)",
        }}
      />

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 rounded-3xl relative z-10"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)",
          boxShadow:
            "0 25px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(191,163,124,0.2)",
        }}
      >
        {/* Icon */}
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #BFA37C 0%, #D4B896 100%)",
          }}
        >
          <Shield className="text-white w-7 h-7" />
        </div>

        {/* Heading */}
        <h1
          className="text-3xl font-bold text-center mb-2"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#0A2342",
          }}
        >
          Admin Login
        </h1>

        <p className="text-center text-sm mb-8 text-gray-500">
          Secure access to the clinic dashboard
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Email */}
        <label className="block mb-5">
          <span className="text-sm font-medium text-[#0A2342]">Email</span>
          <Input
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
            className="mt-1 border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C]"
          />
        </label>

        {/* Password */}
        <label className="block mb-8">
          <span className="text-sm font-medium text-[#0A2342]">Password</span>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            required
            className="mt-1 border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C]"
          />
        </label>

        {/* Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-sm font-semibold tracking-wider rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
            color: "#FFFFFF",
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Admin access only. Contact the clinic to request credentials.
        </p>

        <div className="mt-4 text-center text-sm">
          <Link
            href="/"
            className="font-medium hover:underline"
            style={{ color: "#BFA37C" }}
          >
            Back to website
          </Link>
        </div>
      </form>
    </main>
  );
}