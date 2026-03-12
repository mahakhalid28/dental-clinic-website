import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/dashboard/revenue
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "month"; // day, week, month, year
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    const now = new Date();
    let queryStartDate: string;
    let queryEndDate: string = now.toISOString();

    // Determine date range based on period
    if (startDate && endDate) {
      queryStartDate = startDate;
      queryEndDate = endDate;
    } else {
      switch (period) {
        case "day":
          queryStartDate = now.toISOString().split("T")[0];
          break;
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
    }

    // Fetch payments in date range
    const { data: payments, error } = await supabase
      .from("payments")
      .select("*")
      .gte("created_at", queryStartDate)
      .lte("created_at", queryEndDate)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate totals
    const completedPayments = payments?.filter(p => p.payment_status === "completed") || [];
    const pendingPayments = payments?.filter(p => p.payment_status === "pending") || [];
    const failedPayments = payments?.filter(p => p.payment_status === "failed") || [];
    const refundedPayments = payments?.filter(p => p.payment_status === "refunded") || [];

    const totalRevenue = completedPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const pendingAmount = pendingPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const refundedAmount = refundedPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

    // Group by payment method
    const byMethod: Record<string, { count: number; amount: number }> = {};
    completedPayments.forEach(p => {
      if (!byMethod[p.payment_method]) {
        byMethod[p.payment_method] = { count: 0, amount: 0 };
      }
      byMethod[p.payment_method].count++;
      byMethod[p.payment_method].amount += parseFloat(p.amount);
    });

    // Group by day for charts
    const dailyRevenue: Record<string, number> = {};
    completedPayments.forEach(p => {
      const date = p.paid_at?.split("T")[0] || p.created_at.split("T")[0];
      dailyRevenue[date] = (dailyRevenue[date] || 0) + parseFloat(p.amount);
    });

    // Calculate average transaction
    const avgTransaction = completedPayments.length > 0 
      ? totalRevenue / completedPayments.length 
      : 0;

    return NextResponse.json({
      period: {
        start: queryStartDate,
        end: queryEndDate,
        type: period,
      },
      summary: {
        total_revenue: totalRevenue,
        pending_amount: pendingAmount,
        refunded_amount: refundedAmount,
        net_revenue: totalRevenue - refundedAmount,
        total_transactions: completedPayments.length,
        average_transaction: Math.round(avgTransaction * 100) / 100,
      },
      by_method: byMethod,
      daily_breakdown: Object.entries(dailyRevenue).map(([date, amount]) => ({
        date,
        amount,
      })),
      status_breakdown: {
        completed: completedPayments.length,
        pending: pendingPayments.length,
        failed: failedPayments.length,
        refunded: refundedPayments.length,
      },
    });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
