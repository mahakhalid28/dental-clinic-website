import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/dashboard/stats
export async function GET() {
  try {
    // Get current date info
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const firstDayOfLastMonth = lastMonth.toISOString().split("T")[0];
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split("T")[0];

    // Parallel data fetching
    const [
      patientsRes,
      dentistsRes,
      servicesRes,
      appointmentsRes,
      todayAppointmentsRes,
      monthAppointmentsRes,
      lastMonthAppointmentsRes,
      paymentsMonthRes,
      paymentsLastMonthRes,
      pendingPaymentsRes,
      unreadMessagesRes,
      pendingReviewsRes,
    ] = await Promise.all([
      // Total counts
      supabase.from("patients").select("id", { count: "exact", head: true }),
      supabase.from("dentists").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("services").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("appointments").select("id", { count: "exact", head: true }),
      
      // Today's appointments
      supabase
        .from("appointments")
        .select("id, status", { count: "exact" })
        .eq("appointment_date", today),
      
      // This month's appointments
      supabase
        .from("appointments")
        .select("id", { count: "exact", head: true })
        .gte("appointment_date", firstDayOfMonth),
      
      // Last month's appointments (for comparison)
      supabase
        .from("appointments")
        .select("id", { count: "exact", head: true })
        .gte("appointment_date", firstDayOfLastMonth)
        .lte("appointment_date", lastDayOfLastMonth),
      
      // This month's revenue
      supabase
        .from("payments")
        .select("amount")
        .eq("payment_status", "completed")
        .gte("created_at", firstDayOfMonth),
      
      // Last month's revenue
      supabase
        .from("payments")
        .select("amount")
        .eq("payment_status", "completed")
        .gte("created_at", firstDayOfLastMonth)
        .lte("created_at", lastDayOfLastMonth),
      
      // Pending payments
      supabase
        .from("payments")
        .select("amount")
        .eq("payment_status", "pending"),
      
      // Unread messages
      supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("status", "unread"),
      
      // Pending reviews
      supabase
        .from("reviews")
        .select("id", { count: "exact", head: true })
        .eq("is_approved", false),
    ]);

    // Calculate revenues
    const monthRevenue = paymentsMonthRes.data?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;
    const lastMonthRevenue = paymentsLastMonthRes.data?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;
    const pendingRevenue = pendingPaymentsRes.data?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;

    // Calculate growth percentages
    const revenueGrowth = lastMonthRevenue > 0 
      ? ((monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : 0;
    
    const appointmentGrowth = (lastMonthAppointmentsRes.count || 0) > 0
      ? (((monthAppointmentsRes.count || 0) - (lastMonthAppointmentsRes.count || 0)) / (lastMonthAppointmentsRes.count || 1)) * 100
      : 0;

    // Today's appointment breakdown
    const todayData = todayAppointmentsRes.data || [];
    const todayStats = {
      total: todayAppointmentsRes.count || 0,
      scheduled: todayData.filter(a => a.status === "scheduled").length,
      confirmed: todayData.filter(a => a.status === "confirmed").length,
      completed: todayData.filter(a => a.status === "completed").length,
      cancelled: todayData.filter(a => a.status === "cancelled").length,
      in_progress: todayData.filter(a => a.status === "in_progress").length,
    };

    return NextResponse.json({
      overview: {
        total_patients: patientsRes.count || 0,
        total_dentists: dentistsRes.count || 0,
        total_services: servicesRes.count || 0,
        total_appointments: appointmentsRes.count || 0,
      },
      today: todayStats,
      month: {
        appointments: monthAppointmentsRes.count || 0,
        revenue: monthRevenue,
        appointment_growth: Math.round(appointmentGrowth * 10) / 10,
        revenue_growth: Math.round(revenueGrowth * 10) / 10,
      },
      pending: {
        payments: pendingRevenue,
        unread_messages: unreadMessagesRes.count || 0,
        pending_reviews: pendingReviewsRes.count || 0,
      },
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
