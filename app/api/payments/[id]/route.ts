import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/payments/:id
// GET /api/payments/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: payment, error } = await supabase
      .from("payments")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch related data
    const [patientRes, appointmentRes] = await Promise.all([
      payment.patient_id
        ? supabase
            .from("patients")
            .select("id, name, email, phone") // UPDATED: Changed first_name, last_name to just 'name'
            .eq("id", payment.patient_id)
            .single()
        : Promise.resolve({ data: null }),
      payment.appointment_id
        ? supabase
            .from("appointments")
            .select("id, appointment_date, appointment_time, service_id, dentist_id")
            .eq("id", payment.appointment_id)
            .single()
        : Promise.resolve({ data: null }),
    ]);

    return NextResponse.json({
      ...payment,
      patient: patientRes.data,
      appointment: appointmentRes.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch payment" },
      { status: 500 }
    );
  }
}

// PUT /api/payments/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate payment status if provided
    if (body.payment_status) {
      const validStatuses = ["pending", "completed", "failed", "refunded", "partial"];
      if (!validStatuses.includes(body.payment_status)) {
        return NextResponse.json(
          { error: `Invalid payment status. Must be one of: ${validStatuses.join(", ")}` },
          { status: 400 }
        );
      }
    }

    // Validate payment method if provided
    if (body.payment_method) {
      const validMethods = ["cash", "card", "online", "bank_transfer", "insurance"];
      if (!validMethods.includes(body.payment_method)) {
        return NextResponse.json(
          { error: `Invalid payment method. Must be one of: ${validMethods.join(", ")}` },
          { status: 400 }
        );
      }
    }

    // Build update object
    const updateData: Record<string, any> = {};
    
    if (body.amount !== undefined) updateData.amount = parseFloat(body.amount);
    if (body.payment_method !== undefined) updateData.payment_method = body.payment_method;
    if (body.payment_status !== undefined) {
      updateData.payment_status = body.payment_status;
      // Set paid_at when status changes to completed
      if (body.payment_status === "completed") {
        updateData.paid_at = new Date().toISOString();
      }
    }
    if (body.transaction_id !== undefined) updateData.transaction_id = body.transaction_id;
    if (body.discount_amount !== undefined) updateData.discount_amount = body.discount_amount;
    if (body.tax_amount !== undefined) updateData.tax_amount = body.tax_amount;
    if (body.notes !== undefined) updateData.notes = body.notes;

    const { data, error } = await supabase
      .from("payments")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }
}

// DELETE /api/payments/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("payments")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Payment deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete payment" },
      { status: 500 }
    );
  }
}
