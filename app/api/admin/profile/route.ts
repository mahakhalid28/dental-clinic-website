import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Helper to get current admin from session
async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;

  if (!sessionToken) {
    return null;
  }

  const { data: admin, error } = await supabase
    .from("admins")
    .select("*")
    .eq("session_token", sessionToken)
    .eq("is_active", true)
    .single();

  if (error || !admin) {
    return null;
  }

  return admin;
}

// GET /api/admin/profile
export async function GET() {
  try {
    const admin = await getCurrentAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Return admin data without sensitive fields
    const { password_hash, session_token, ...adminData } = admin;

    return NextResponse.json(adminData);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/profile
export async function PUT(request: Request) {
  try {
    const admin = await getCurrentAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { first_name, last_name, phone, avatar_url } = body;

    // Update admin profile
    const { data: updatedAdmin, error } = await supabase
      .from("admins")
      .update({
        first_name: first_name || admin.first_name,
        last_name: last_name || admin.last_name,
        phone: phone !== undefined ? phone : admin.phone,
        avatar_url: avatar_url !== undefined ? avatar_url : admin.avatar_url,
      })
      .eq("id", admin.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return updated admin data without sensitive fields
    const { password_hash, session_token, ...adminData } = updatedAdmin;

    return NextResponse.json({
      message: "Profile updated successfully",
      admin: adminData,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
