import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/payments/appointment/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verify appointment exists
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .select("id, patient_id, service_id, appointment_date, appointment_time, status")
      .eq("id", params.id)
      .single();

    if (appointmentError || !appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Fetch payments for this appointment
    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("*")
      .eq("appointment_id", params.id)
      .order("created_at", { ascending: false });

    if (paymentsError) {
      return NextResponse.json({ error: paymentsError.message }, { status: 500 });
    }

    // Calculate totals
    const totalPaid = payments
      ?.filter(p => p.payment_status === "completed")
      .reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;

    const totalPending = payments
      ?.filter(p => p.payment_status === "pending")
      .reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;

    // Get service price for reference
    let servicePrice = 0;
    if (appointment.service_id) {
      const { data: service } = await supabase
        .from("services")
        .select("price")
        .eq("id", appointment.service_id)
        .single();
      servicePrice = service?.price || 0;
    }

    return NextResponse.json({
      appointment,
      payments: payments || [],
      summary: {
        service_price: servicePrice,
        total_paid: totalPaid,
        total_pending: totalPending,
        balance_due: Math.max(0, servicePrice - totalPaid),
        is_fully_paid: totalPaid >= servicePrice,
      },
    });
  } catch (error) {
    console.error("Error fetching appointment payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment payments" },
      { status: 500 }
    );
  }
}
