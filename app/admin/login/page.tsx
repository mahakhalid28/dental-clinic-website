"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simple redirect to admin dashboard without authentication
    setTimeout(() => {
      window.location.href = '/admin';
    }, 500);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-[#0A2342]">Admin Login</h1>

        <label className="block mb-4">
          <span className="text-sm font-medium text-[#0A2342]">Email</span>
          <Input value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} required />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-[#0A2342]">Password</span>
          <Input type="password" value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} required />
        </label>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="mt-4 text-sm text-[#555555]">Don't have an account? Contact the clinic to create admin access.</p>

        <div className="mt-4 text-sm">
          <Link href="/" className="text-[#0A2342] hover:underline">Back to site</Link>
        </div>
      </form>
    </main>
  );
}
