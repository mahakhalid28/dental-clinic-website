"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Wallet,
  Percent,
  Receipt,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function RevenueAnalytics() {
  const [data, setData] = useState({
    revenue: 0,
    expenses: 0,
    partnerPaid: 0,
  });
  const [loading, setLoading] = useState(true);

  // Configuration: Change this % based on the agreement
  const PARTNER_SHARE_PERCENT = 20;

  useEffect(() => {
    fetchFinancials();
  }, []);

  const fetchFinancials = async () => {
    setLoading(true);
    try {
      const [payRes, expRes] = await Promise.all([
        fetch("/api/payments"),
        fetch("/api/expenses"),
      ]);

      const payments = await payRes.json();
      const expenses = await expRes.json();

      // Calculate Gross Revenue (Only Completed Payments)
      const gross = (payments.data || [])
        .filter((p: any) => p.payment_status === "completed")
        .reduce((sum: number, p: any) => sum + Number(p.amount), 0);

      // Calculate Total Expenses
      const totalExp = (expenses || []).reduce(
        (sum: number, e: any) => sum + Number(e.amount),
        0,
      );

      // Calculate specifically what was paid to partner
      const pPaid = (expenses || [])
        .filter((e: any) => e.category === "Partner Share")
        .reduce((sum: number, e: any) => sum + Number(e.amount), 0);

      setData({ revenue: gross, expenses: totalExp, partnerPaid: pPaid });
    } catch (error) {
      console.error("Analytics Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const netProfit = data.revenue - data.expenses;
  const partnerOwedTotal = (data.revenue * PARTNER_SHARE_PERCENT) / 100;
  const partnerRemaining = Math.max(0, partnerOwedTotal - data.partnerPaid);
  const settlementProgress = Math.min(
    100,
    (data.partnerPaid / partnerOwedTotal) * 100,
  );

  const chartData = [
    { name: "Gross Revenue", value: data.revenue, color: "#0A2342" },
    { name: "Total Expenses", value: data.expenses, color: "#E11D48" },
    { name: "Net Profit", value: netProfit, color: "#10B981" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20">
      <header className="bg-[#0A2342] text-white p-8 border-b border-[#BFA37C]/30 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <ArrowLeft className="h-6 w-6 text-[#BFA37C]" />
            </Link>
            <h1 className="text-3xl font-serif font-bold">
              Financial <span className="text-[#BFA37C]">Intelligence</span>
            </h1>
          </div>
          <Button
            onClick={fetchFinancials}
            variant="outline"
            className="border-[#BFA37C] text-[#BFA37C] hover:bg-[#BFA37C] hover:text-[#0A2342]"
          >
            Refresh Data
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-12 space-y-8">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-md bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <TrendingUp className="text-emerald-600 w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-500 uppercase">
                  Net Profit
                </span>
              </div>
              <p className="text-3xl font-black text-[#0A2342]">
                PKR {netProfit.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Wallet className="text-blue-600 w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-500 uppercase">
                  Gross Revenue
                </span>
              </div>
              <p className="text-3xl font-black text-[#0A2342]">
                PKR {data.revenue.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-rose-50 rounded-lg">
                  <TrendingDown className="text-rose-600 w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-500 uppercase">
                  Total Expenses
                </span>
              </div>
              <p className="text-3xl font-black text-[#0A2342]">
                PKR {data.expenses.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Partner Settlement Tracking */}
        <Card className="border-none shadow-xl bg-white overflow-hidden">
          <div className="bg-[#FAF8F5] p-6 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Users className="text-[#C5A27D] w-6 h-6" />
              <h2 className="text-xl font-bold text-[#0A2342]">
                Partner Share Settlement
              </h2>
            </div>
            <Badge className="bg-[#BFA37C] text-white px-4 py-1">
              {PARTNER_SHARE_PERCENT}% Agreement
            </Badge>
          </div>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-500">Total Share Owed</span>
                  <span className="text-[#0A2342]">
                    PKR {partnerOwedTotal.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={settlementProgress}
                  className="h-3 bg-slate-100"
                />
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-emerald-50">
                    <p className="text-xs font-bold text-emerald-700 uppercase mb-1">
                      Total Paid
                    </p>
                    <p className="text-xl font-black text-emerald-900">
                      PKR {data.partnerPaid.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50">
                    <p className="text-xs font-bold text-amber-700 uppercase mb-1">
                      Remaining
                    </p>
                    <p className="text-xl font-black text-amber-900">
                      PKR {partnerRemaining.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: "#F1F5F9" }} />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
