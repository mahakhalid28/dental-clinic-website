"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        // Store admin info in localStorage for easy access
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
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-[#0A2342]">Admin Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <label className="block mb-4">
          <span className="text-sm font-medium text-[#0A2342]">Email</span>
          <Input
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-[#0A2342]">Password</span>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            required
          />
        </label>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="mt-4 text-sm text-[#555555]">
          Don't have an account? Contact the clinic to create admin access.
        </p>

        <div className="mt-4 text-sm">
          <Link href="/" className="text-[#0A2342] hover:underline">
            Back to site
          </Link>
        </div>
      </form>
    </main>
  );
}
