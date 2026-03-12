import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/dentists
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("dentists")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dentists" },
      { status: 500 }
    );
  }
}

// POST /api/dentists
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.specialization || !body.qualifications) {
      return NextResponse.json(
        { error: "Name, specialization, and qualifications are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("dentists")
      .insert([
        {
          name: body.name,
          email: body.email || null,
          phone: body.phone || null,
          specialization: body.specialization,
          experience_years: body.experience_years || 0,
          qualifications: body.qualifications,
          bio: body.bio || null,
          image: body.image || null,
          license_number: body.license_number || null,
          consultation_fee: body.consultation_fee || null,
          available_days: body.available_days || null,
          working_hours_start: body.working_hours_start || null,
          working_hours_end: body.working_hours_end || null,
          is_active: body.is_active !== false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to create dentist" },
      { status: 500 }
    );
  }
}
