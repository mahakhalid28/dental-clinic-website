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
        patientIds.length > 0 ? supabase.from("patients").select("id, name, email, phone").in("id", patientIds) : Promise.resolve({ data: [] }),
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

    // 1. Upsert Patient
    const { data: patient, error: patientError } = await supabase
      .from("patients")
      .upsert(
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          city: body.city,
          blood_group: body.blood_group,
          gender: body.gender,
          history_diabetes: body.history_diabetes,
          history_heart: body.history_heart,
          history_hypertension: body.history_hypertension,
          history_bleeding: body.history_bleeding,
          history_smoker: body.history_smoker,
          history_pregnant: body.history_pregnant,
          allergies: body.allergies,
          current_medications: body.current_medications,
        },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    if (patientError) return NextResponse.json({ error: patientError.message }, { status: 400 });

    // 2. Insert Appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .insert([{
        patient_id: patient.id,
        service_id: body.service_id,
        dentist_id: body.dentist_id,
        appointment_date: body.appointment_date,
        appointment_time: body.appointment_time,
        notes: body.notes,
        status: "scheduled",
      }])
      .select()
      .single();

    if (appointmentError) return NextResponse.json({ error: appointmentError.message }, { status: 500 });

    // --- NEW: AUTOMATED BILLING LOGIC ---
    // 3. Get Service Price
    const { data: serviceData } = await supabase
      .from("services")
      .select("price")
      .eq("id", body.service_id)
      .single();

    const price = serviceData?.price || 0;

    // 4. Create Payment Record
    const invoiceNumber = `INV-${Date.now()}-${patient.id.slice(0, 4)}`.toUpperCase();
    await supabase.from("payments").insert([{
      patient_id: patient.id,
      appointment_id: appointment.id,
      amount: price,
      payment_method: "cash",
      payment_status: "pending",
      invoice_number: invoiceNumber,
      notes: `Automated bill for ${body.service_id} appointment`
    }]);

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}