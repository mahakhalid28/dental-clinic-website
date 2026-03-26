"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Receipt,
  TrendingDown,
  Users,
  Search,
  Trash2,
  Calendar as CalendarIcon,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  expense_date: string;
  created_at: string;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Other",
    expense_date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    "Rent",
    "Salaries",
    "Materials",
    "Partner Share",
    "Utilities",
    "Other",
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses");
      if (res.ok) {
        const data = await res.json();
        setExpenses(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: Math.abs(parseFloat(formData.amount)), // Always positive
        }),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Expense logged successfully.",
        });
        fetchExpenses();
        setIsDialogOpen(false);
        setFormData({
          description: "",
          amount: "",
          category: "Other",
          expense_date: new Date().toISOString().split("T")[0],
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save expense.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchExpenses();
        toast({ title: "Deleted", description: "Record removed." });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Calculations
  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0,
  );
  const partnerSharePaid = expenses
    .filter((exp) => exp.category === "Partner Share")
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header synchronized with Payments Vault */}
      <header className="bg-[#0A2342] text-white shadow-xl border-b border-[#BFA37C]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <ArrowLeft className="h-6 w-6 text-[#BFA37C]" />
              </Link>
              <h1 className="text-2xl font-serif font-bold">
                Clinic <span className="text-[#BFA37C]">Outflow</span>
              </h1>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#BFA37C] hover:bg-[#D4B896] text-[#0A2342] font-bold rounded-xl px-6">
                  <Plus className="h-5 w-5 mr-2" /> Log Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif text-[#0A2342]">
                    New Expense Entry
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      placeholder="e.g. Monthly Rent or Partner Share"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Amount (PKR)</Label>
                      <Input
                        type="number"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) =>
                          setFormData({ ...formData, category: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={formData.expense_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expense_date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#0A2342] text-white py-6 rounded-xl"
                  >
                    Save Expense
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white border-none shadow-[0_8px_32px_0_rgba(10,35,66,0.08)] rounded-2xl">
            <CardContent className="p-8 flex items-center gap-6">
              <div className="p-4 rounded-xl bg-rose-50">
                <TrendingDown className="h-8 w-8 text-rose-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Total Expenses
                </p>
                <p className="text-3xl font-black text-[#0A2342]">
                  PKR {totalExpenses.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-[0_8px_32px_0_rgba(10,35,66,0.08)] rounded-2xl">
            <CardContent className="p-8 flex items-center gap-6">
              <div className="p-4 rounded-xl bg-[#F9FAFB]">
                <Users className="h-8 w-8 text-[#C5A27D]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#C5A27D] uppercase tracking-widest mb-1">
                  Partner Share Paid
                </p>
                <p className="text-3xl font-black text-[#0A2342]">
                  PKR {partnerSharePaid.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search expenses by name or category..."
            className="pl-12 py-7 rounded-2xl border-none shadow-sm bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Expenses Table */}
        <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-[#FAF8F5]">
              <TableRow>
                <TableHead className="py-6 px-8 font-bold text-[#0A2342]">
                  DESCRIPTION
                </TableHead>
                <TableHead className="font-bold text-[#0A2342]">
                  CATEGORY
                </TableHead>
                <TableHead className="font-bold text-[#0A2342]">
                  AMOUNT
                </TableHead>
                <TableHead className="font-bold text-[#0A2342]">DATE</TableHead>
                <TableHead className="text-right px-8 font-bold text-[#0A2342]">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-20 text-gray-400"
                  >
                    Loading expenses...
                  </TableCell>
                </TableRow>
              ) : filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-20 text-gray-400"
                  >
                    No expenses found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((exp) => (
                  <TableRow
                    key={exp.id}
                    className="hover:bg-gray-50/50 transition-all border-b border-gray-100"
                  >
                    <TableCell className="py-6 px-8 font-bold text-[#0A2342]">
                      {exp.description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`rounded-full px-3 py-1 ${exp.category === "Partner Share" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-slate-50 text-slate-700"}`}
                      >
                        {exp.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-black text-rose-600">
                      PKR {Number(exp.amount).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-400 flex items-center gap-2">
                      <CalendarIcon className="h-3 w-3" />{" "}
                      {new Date(exp.expense_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(exp.id)}
                        className="hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
