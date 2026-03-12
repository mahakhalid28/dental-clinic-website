import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// Simple hash function for demo purposes
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// POST /api/admin/register
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, first_name, last_name, phone, role } = body;

    // Validate required fields
    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: "Email, password, first name, and last name are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from("admins")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existingAdmin) {
      return NextResponse.json(
        { error: "An admin with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create admin
    const { data: admin, error } = await supabase
      .from("admins")
      .insert([
        {
          email: email.toLowerCase(),
          password_hash,
          first_name,
          last_name,
          phone: phone || null,
          role: role || "admin",
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return admin data without password hash
    const { password_hash: _, ...adminData } = admin;

    return NextResponse.json(
      {
        message: "Admin registered successfully",
        admin: adminData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
