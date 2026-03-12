import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/dentists/:id/appointments
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // First verify dentist exists
    const { data: dentist, error: dentistError } = await supabase
      .from("dentists")
      .select("id, name, specialization")
      .eq("id", params.id)
      .single();

    if (dentistError || !dentist) {
      return NextResponse.json({ error: "Dentist not found" }, { status: 404 });
    }

    // Build query
    let query = supabase
      .from("appointments")
      .select("*", { count: "exact" })
      .eq("dentist_id", params.id)
      .order("appointment_date", { ascending: false });

    // Apply filters
    if (status) {
      query = query.eq("status", status);
    }
    if (date) {
      query = query.eq("appointment_date", date);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: appointments, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch related patients and services
    if (appointments && appointments.length > 0) {
      const patientIds = [...new Set(appointments.map(a => a.patient_id).filter(Boolean))];
      const serviceIds = [...new Set(appointments.map(a => a.service_id).filter(Boolean))];

      const [patientsRes, servicesRes] = await Promise.all([
        patientIds.length > 0
          ? supabase.from("patients").select("id, first_name, last_name, email, phone").in("id", patientIds)
          : Promise.resolve({ data: [] }),
        serviceIds.length > 0
          ? supabase.from("services").select("id, service_name, price, duration_minutes").in("id", serviceIds)
          : Promise.resolve({ data: [] }),
      ]);

      const patients = patientsRes.data || [];
      const services = servicesRes.data || [];

      // Enrich appointments
      const enrichedAppointments = appointments.map(appointment => ({
        ...appointment,
        patient: patients.find(p => p.id === appointment.patient_id),
        service: services.find(s => s.id === appointment.service_id),
      }));

      return NextResponse.json({
        dentist,
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
      dentist,
      appointments: [],
      pagination: {
        total: 0,
        limit,
        offset,
        hasMore: false,
      },
    });
  } catch (error) {
    console.error("Error fetching dentist appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch dentist appointments" },
      { status: 500 }
    );
  }
}
