import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch related data separately if needed
    if (data && data.length > 0) {
      const patientIds = [...new Set(data.map(a => a.patient_id).filter(Boolean))];
      const dentistIds = [...new Set(data.map(a => a.dentist_id).filter(Boolean))];
      const serviceIds = [...new Set(data.map(a => a.service_id).filter(Boolean))];

      const [patientsRes, dentistsRes, servicesRes] = await Promise.all([
        patientIds.length > 0 ? supabase.from("patients").select("id, first_name, last_name, email, phone").in("id", patientIds) : Promise.resolve({ data: [] }),
        dentistIds.length > 0 ? supabase.from("dentists").select("id, name").in("id", dentistIds) : Promise.resolve({ data: [] }),
        serviceIds.length > 0 ? supabase.from("services").select("id, service_name").in("id", serviceIds) : Promise.resolve({ data: [] })
      ]);

      const patients = patientsRes.data || [];
      const dentists = dentistsRes.data || [];
      const services = servicesRes.data || [];

      // Merge data
      const enrichedData = data.map(appointment => ({
        ...appointment,
        patient: patients.find(p => p.id === appointment.patient_id),
        dentist: dentists.find(d => d.id === appointment.dentist_id),
        service: services.find(s => s.id === appointment.service_id)
      }));

      return NextResponse.json(enrichedData);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("appointments")
      .insert([body])
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
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}