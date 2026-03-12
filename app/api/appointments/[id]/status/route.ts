import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

const VALID_STATUSES = [
  "scheduled",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
  "no_show",
  "rescheduled",
];

// PUT /api/appointments/:id/status
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, reason, notes, changed_by } = body;

    // Validate status
    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    // Get current appointment
    const { data: currentAppointment, error: fetchError } = await supabase
      .from("appointments")
      .select("id, status")
      .eq("id", params.id)
      .single();

    if (fetchError || !currentAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    const previousStatus = currentAppointment.status;

    // Update appointment status
    const updateData: Record<string, any> = { status };
    if (status === "cancelled" && reason) {
      updateData.cancellation_reason = reason;
    }
    if (notes) {
      updateData.notes = notes;
    }

    const { data: updatedAppointment, error: updateError } = await supabase
      .from("appointments")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Create history record
    const { error: historyError } = await supabase
      .from("appointment_history")
      .insert([
        {
          appointment_id: params.id,
          previous_status: previousStatus,
          new_status: status,
          changed_by: changed_by || null,
          change_reason: reason || null,
          notes: notes || null,
        },
      ]);

    if (historyError) {
      console.error("Failed to create history record:", historyError);
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      message: "Status updated successfully",
      appointment: updatedAppointment,
      previous_status: previousStatus,
      new_status: status,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return NextResponse.json(
      { error: "Failed to update appointment status" },
      { status: 500 }
    );
  }
}
