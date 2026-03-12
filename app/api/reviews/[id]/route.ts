import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/reviews/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Review not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch related data
    const [dentistRes, patientRes] = await Promise.all([
      data.dentist_id
        ? supabase.from("dentists").select("id, name, specialization").eq("id", data.dentist_id).single()
        : Promise.resolve({ data: null }),
      data.patient_id
        ? supabase.from("patients").select("id, first_name, last_name").eq("id", data.patient_id).single()
        : Promise.resolve({ data: null }),
    ]);

    return NextResponse.json({
      ...data,
      dentist: dentistRes.data,
      patient: patientRes.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}

// PUT /api/reviews/:id (for approving/featuring reviews)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updateData: Record<string, any> = {};

    if (body.is_approved !== undefined) {
      updateData.is_approved = body.is_approved;
      if (body.is_approved && body.approved_by) {
        updateData.approved_by = body.approved_by;
        updateData.approved_at = new Date().toISOString();
      }
    }

    if (body.is_featured !== undefined) {
      updateData.is_featured = body.is_featured;
    }

    if (body.is_visible !== undefined) {
      updateData.is_visible = body.is_visible;
    }

    if (body.content !== undefined) {
      updateData.content = body.content;
    }

    if (body.title !== undefined) {
      updateData.title = body.title;
    }

    if (body.rating !== undefined) {
      const rating = parseInt(body.rating);
      if (rating < 1 || rating > 5) {
        return NextResponse.json(
          { error: "Rating must be between 1 and 5" },
          { status: 400 }
        );
      }
      updateData.rating = rating;
    }

    const { data, error } = await supabase
      .from("reviews")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Review not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
