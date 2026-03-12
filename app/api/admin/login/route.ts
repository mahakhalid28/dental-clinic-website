import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Simple hash function for demo purposes
// In production, use bcrypt or argon2
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// POST /api/admin/login
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find admin by email
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("is_active", true)
      .single();

    if (error || !admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, admin.password_hash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Update last login
    await supabase
      .from("admins")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", admin.id);

    // Create session token (simple implementation)
    const sessionToken = crypto.randomUUID();
    
    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Store session in admin record (simple approach - in production use separate sessions table)
    await supabase
      .from("admins")
      .update({ session_token: sessionToken })
      .eq("id", admin.id);

    // Return admin data without sensitive fields
    const { password_hash, session_token, ...adminData } = admin;

    return NextResponse.json({
      message: "Login successful",
      admin: adminData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
