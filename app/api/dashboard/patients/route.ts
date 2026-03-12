import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/dashboard/patients
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "month";
    const limit = parseInt(searchParams.get("limit") || "10");

    const now = new Date();
    let queryStartDate: string;

    switch (period) {
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        queryStartDate = weekAgo.toISOString();
        break;
      case "year":
        queryStartDate = new Date(now.getFullYear(), 0, 1).toISOString();
        break;
      case "month":
      default:
        queryStartDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        break;
    }

    // Get total patients count
    const { count: totalPatients } = await supabase
      .from("patients")
      .select("id", { count: "exact", head: true });

    // Get new patients in period
    const { data: newPatients, count: newPatientsCount } = await supabase
      .from("patients")
      .select("id, first_name, last_name, email, phone, created_at", { count: "exact" })
      .gte("created_at", queryStartDate)
      .order("created_at", { ascending: false });

    // Get patients with most appointments
    const { data: appointments } = await supabase
      .from("appointments")
      .select("patient_id")
      .gte("created_at", queryStartDate);

    // Count appointments per patient
    const patientAppointmentCounts: Record<string, number> = {};
    appointments?.forEach(a => {
      if (a.patient_id) {
        patientAppointmentCounts[a.patient_id] = (patientAppointmentCounts[a.patient_id] || 0) + 1;
      }
    });

    // Get top patients by appointments
    const topPatientIds = Object.entries(patientAppointmentCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([id]) => id);

    let topPatients: any[] = [];
    if (topPatientIds.length > 0) {
      const { data: patients } = await supabase
        .from("patients")
        .select("id, first_name, last_name, email, phone")
        .in("id", topPatientIds);

      topPatients = patients?.map(p => ({
        ...p,
        appointment_count: patientAppointmentCounts[p.id] || 0,
      })).sort((a, b) => b.appointment_count - a.appointment_count) || [];
    }

    // Get patients with upcoming appointments
    const today = now.toISOString().split("T")[0];
    const { data: upcomingAppointments } = await supabase
      .from("appointments")
      .select("patient_id, appointment_date, appointment_time")
      .gte("appointment_date", today)
      .in("status", ["scheduled", "confirmed"])
      .order("appointment_date", { ascending: true })
      .limit(20);

    const upcomingPatientIds = [...new Set(upcomingAppointments?.map(a => a.patient_id).filter(Boolean) || [])];
    
    let patientsWithUpcoming: any[] = [];
    if (upcomingPatientIds.length > 0) {
      const { data: patients } = await supabase
        .from("patients")
        .select("id, first_name, last_name, email, phone")
        .in("id", upcomingPatientIds)
        .limit(limit);

      patientsWithUpcoming = patients?.map(p => {
        const nextAppointment = upcomingAppointments?.find(a => a.patient_id === p.id);
        return {
          ...p,
          next_appointment: nextAppointment ? {
            date: nextAppointment.appointment_date,
            time: nextAppointment.appointment_time,
          } : null,
        };
      }) || [];
    }

    // Calculate growth
    const lastPeriodStart = new Date(queryStartDate);
    const periodDuration = now.getTime() - lastPeriodStart.getTime();
    const previousPeriodStart = new Date(lastPeriodStart.getTime() - periodDuration).toISOString();

    const { count: previousPeriodCount } = await supabase
      .from("patients")
      .select("id", { count: "exact", head: true })
      .gte("created_at", previousPeriodStart)
      .lt("created_at", queryStartDate);

    const growth = (previousPeriodCount || 0) > 0
      ? (((newPatientsCount || 0) - (previousPeriodCount || 0)) / (previousPeriodCount || 1)) * 100
      : 0;

    return NextResponse.json({
      period: {
        start: queryStartDate,
        type: period,
      },
      summary: {
        total_patients: totalPatients || 0,
        new_patients: newPatientsCount || 0,
        growth_percentage: Math.round(growth * 10) / 10,
      },
      recent_patients: newPatients?.slice(0, limit) || [],
      top_patients: topPatients,
      patients_with_upcoming_appointments: patientsWithUpcoming,
    });
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient data" },
      { status: 500 }
    );
  }
}
