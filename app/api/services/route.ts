import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/services
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const activeOnly = searchParams.get("active") !== "false";

    let query = supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (activeOnly) {
      query = query.eq("is_active", true);
    }

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST /api/services
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.service_name || body.price === undefined) {
      return NextResponse.json(
        { error: "Service name and price are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          service_name: body.service_name,
          description: body.description || null,
          price: parseFloat(body.price),
          duration_minutes: body.duration_minutes || 30,
          category: body.category || null,
          image: body.image || null,
          is_active: body.is_active !== false,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
