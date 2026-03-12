import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/appointments/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: appointment, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch related data
    const [patientRes, dentistRes, serviceRes] = await Promise.all([
      appointment.patient_id
        ? supabase.from("patients").select("id, first_name, last_name, email, phone").eq("id", appointment.patient_id).single()
        : Promise.resolve({ data: null }),
      appointment.dentist_id  
        ? supabase.from("dentists").select("id, name, specialization").eq("id", appointment.dentist_id).single()
        : Promise.resolve({ data: null }),
      appointment.service_id
        ? supabase.from("services").select("id, service_name, price, duration_minutes").eq("id", appointment.service_id).single()
        : Promise.resolve({ data: null }),
    ]);

    return NextResponse.json({
      ...appointment,
      patient: patientRes.data,
      dentist: dentistRes.data,
      service: serviceRes.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}

// PUT /api/appointments/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("appointments")
      .update(body)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}