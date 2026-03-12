import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/patients/:id/appointments
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // First verify patient exists
    const { data: patient, error: patientError } = await supabase
      .from("patients")
      .select("id, first_name, last_name")
      .eq("id", params.id)
      .single();

    if (patientError || !patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Build query
    let query = supabase
      .from("appointments")
      .select("*", { count: "exact" })
      .eq("patient_id", params.id)
      .order("appointment_date", { ascending: false });

    // Apply status filter if provided
    if (status) {
      query = query.eq("status", status);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: appointments, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch related dentists and services
    if (appointments && appointments.length > 0) {
      const dentistIds = [...new Set(appointments.map(a => a.dentist_id).filter(Boolean))];
      const serviceIds = [...new Set(appointments.map(a => a.service_id).filter(Boolean))];

      const [dentistsRes, servicesRes] = await Promise.all([
        dentistIds.length > 0
          ? supabase.from("dentists").select("id, name, specialization").in("id", dentistIds)
          : Promise.resolve({ data: [] }),
        serviceIds.length > 0
          ? supabase.from("services").select("id, service_name, price").in("id", serviceIds)
          : Promise.resolve({ data: [] }),
      ]);

      const dentists = dentistsRes.data || [];
      const services = servicesRes.data || [];

      // Enrich appointments with related data
      const enrichedAppointments = appointments.map(appointment => ({
        ...appointment,
        dentist: dentists.find(d => d.id === appointment.dentist_id),
        service: services.find(s => s.id === appointment.service_id),
      }));

      return NextResponse.json({
        patient,
        appointments: enrichedAppointments,
        pagination: {
          total: count,
          limit,
          offset,
          hasMore: (count || 0) > offset + limit,
        },
      });
    }

    return NextResponse.json({
      patient,
      appointments: [],
      pagination: {
        total: 0,
        limit,
        offset,
        hasMore: false,
      },
    });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient appointments" },
      { status: 500 }
    );
  }
}
