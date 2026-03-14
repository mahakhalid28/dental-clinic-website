import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// Helper to generate invoice number
function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `INV-${year}${month}-${random}`;
}

// GET /api/payments
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const payment_method = searchParams.get("method");
    const patient_id = searchParams.get("patient_id");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
      .from("payments")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply filters
    if (status) {
      query = query.eq("payment_status", status);
    }
    if (payment_method) {
      query = query.eq("payment_method", payment_method);
    }
    if (patient_id) {
      query = query.eq("patient_id", patient_id);
    }
    if (startDate) {
      query = query.gte("created_at", startDate);
    }
    if (endDate) {
      query = query.lte("created_at", endDate);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: payments, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Enrich with related data
    if (payments && payments.length > 0) {
      const patientIds = [...new Set(payments.map(p => p.patient_id).filter(Boolean))];
      const appointmentIds = [...new Set(payments.map(p => p.appointment_id).filter(Boolean))];

      // FIX: Use 'name' instead of 'first_name, last_name' to match your actual schema
const [patientsRes, appointmentsRes] = await Promise.all([
  patientIds.length > 0
    ? supabase.from("patients").select("id, name, email").in("id", patientIds)
    : Promise.resolve({ data: [] }),
  appointmentIds.length > 0
    ? supabase.from("appointments").select("id, appointment_date, appointment_time, service_id").in("id", appointmentIds)
    : Promise.resolve({ data: [] }),
]);

      const patients = patientsRes.data || [];
      const appointments = appointmentsRes.data || [];

      const enrichedPayments = payments.map(payment => ({
        ...payment,
        patient: patients.find(p => p.id === payment.patient_id),
        appointment: appointments.find(a => a.id === payment.appointment_id),
      }));

      return NextResponse.json({
        data: enrichedPayments,
        pagination: {
          total: count,
          limit,
          offset,
          hasMore: (count || 0) > offset + limit,
        },
      });
    }

    return NextResponse.json({
      data: [],
      pagination: {
        total: 0,
        limit,
        offset,
        hasMore: false,
      },
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

// POST /api/payments
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.amount || !body.payment_method) {
      return NextResponse.json(
        { error: "Amount and payment method are required" },
        { status: 400 }
      );
    }

    // Validate payment method
    const validMethods = ["cash", "card", "online", "bank_transfer", "insurance"];
    if (!validMethods.includes(body.payment_method)) {
      return NextResponse.json(
        { error: `Invalid payment method. Must be one of: ${validMethods.join(", ")}` },
        { status: 400 }
      );
    }

    // Generate invoice number
    const invoice_number = body.invoice_number || generateInvoiceNumber();

    const { data, error } = await supabase
      .from("payments")
      .insert([
        {
          appointment_id: body.appointment_id || null,
          patient_id: body.patient_id || null,
          amount: parseFloat(body.amount),
          payment_method: body.payment_method,
          payment_status: body.payment_status || "pending",
          transaction_id: body.transaction_id || null,
          invoice_number,
          discount_amount: body.discount_amount || 0,
          tax_amount: body.tax_amount || 0,
          notes: body.notes || null,
          paid_at: body.payment_status === "completed" ? new Date().toISOString() : null,
          created_by: body.created_by || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
