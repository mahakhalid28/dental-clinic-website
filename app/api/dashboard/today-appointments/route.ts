import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/dashboard/today-appointments
export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("appointment_date", today)
      .order("appointment_time", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({
        date: today,
        appointments: [],
        summary: {
          total: 0,
          by_status: {},
        },
      });
    }

    // Fetch related data
    const patientIds = [...new Set(appointments.map(a => a.patient_id).filter(Boolean))];
    const dentistIds = [...new Set(appointments.map(a => a.dentist_id).filter(Boolean))];
    const serviceIds = [...new Set(appointments.map(a => a.service_id).filter(Boolean))];

    const [patientsRes, dentistsRes, servicesRes] = await Promise.all([
      patientIds.length > 0
        ? supabase.from("patients").select("id, first_name, last_name, email, phone").in("id", patientIds)
        : Promise.resolve({ data: [] }),
      dentistIds.length > 0
        ? supabase.from("dentists").select("id, name, specialization").in("id", dentistIds)
        : Promise.resolve({ data: [] }),
      serviceIds.length > 0
        ? supabase.from("services").select("id, service_name, duration_minutes, price").in("id", serviceIds)
        : Promise.resolve({ data: [] }),
    ]);

    const patients = patientsRes.data || [];
    const dentists = dentistsRes.data || [];
    const services = servicesRes.data || [];

    // Enrich appointments
    const enrichedAppointments = appointments.map(appointment => ({
      ...appointment,
      patient: patients.find(p => p.id === appointment.patient_id),
      dentist: dentists.find(d => d.id === appointment.dentist_id),
      service: services.find(s => s.id === appointment.service_id),
    }));

    // Group by status
    const byStatus: Record<string, number> = {};
    appointments.forEach(a => {
      byStatus[a.status] = (byStatus[a.status] || 0) + 1;
    });

    // Group by dentist
    const byDentist: Record<string, { name: string; count: number }> = {};
    appointments.forEach(a => {
      if (a.dentist_id) {
        const dentist = dentists.find(d => d.id === a.dentist_id);
        if (dentist) {
          if (!byDentist[a.dentist_id]) {
            byDentist[a.dentist_id] = { name: dentist.name, count: 0 };
          }
          byDentist[a.dentist_id].count++;
        }
      }
    });

    return NextResponse.json({
      date: today,
      appointments: enrichedAppointments,
      summary: {
        total: appointments.length,
        by_status: byStatus,
        by_dentist: Object.values(byDentist),
      },
    });
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch today's appointments" },
      { status: 500 }
    );
  }
}
