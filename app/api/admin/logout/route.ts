import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// POST /api/admin/logout
export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    if (sessionToken) {
      // Clear session token in database
      await supabase
        .from("admins")
        .update({ session_token: null })
        .eq("session_token", sessionToken);
    }

    // Clear session cookie
    cookieStore.set("admin_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
