import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/appointments/:id/history
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verify appointment exists
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .select("id, status, patient_id, dentist_id, service_id, appointment_date, appointment_time")
      .eq("id", params.id)
      .single();

    if (appointmentError || !appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Fetch history records
    const { data: history, error: historyError } = await supabase
      .from("appointment_history")
      .select("*")
      .eq("appointment_id", params.id)
      .order("changed_at", { ascending: false });

    if (historyError) {
      return NextResponse.json({ error: historyError.message }, { status: 500 });
    }

    // Fetch admin names for changed_by
    if (history && history.length > 0) {
      const adminIds = [...new Set(history.map(h => h.changed_by).filter(Boolean))];
      
      if (adminIds.length > 0) {
        const { data: admins } = await supabase
          .from("admins")
          .select("id, first_name, last_name")
          .in("id", adminIds);

        const adminsMap = new Map((admins || []).map(a => [a.id, `${a.first_name} ${a.last_name}`]));

        const enrichedHistory = history.map(h => ({
          ...h,
          changed_by_name: h.changed_by ? adminsMap.get(h.changed_by) || "Unknown" : null,
        }));

        return NextResponse.json({
          appointment,
          history: enrichedHistory,
        });
      }
    }

    return NextResponse.json({
      appointment,
      history: history || [],
    });
  } catch (error) {
    console.error("Error fetching appointment history:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment history" },
      { status: 500 }
    );
  }
}
