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
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import {
  CreditCard,
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowLeft,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";

interface Payment {
  id: string;
  patient_id: string | null;
  amount: number;
  payment_method: string;
  payment_status: string;
  invoice_number: string | null;
  transaction_id: string | null;
  notes: string | null;
  created_at: string;
  patient?: {
    name: string;
    email: string;
  };
}

export default function PaymentsManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [formData, setFormData] = useState({
    patient_id: "",
    amount: "",
    payment_method: "cash",
    payment_status: "pending",
    notes: "",
    invoice_number: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [paymentsRes, patientsRes] = await Promise.all([
        fetch("/api/payments"),
        fetch("/api/patients"),
      ]);

      if (paymentsRes.ok) {
        const result = await paymentsRes.json();
        setPayments(result.data || []);
      }
      if (patientsRes.ok) {
        const data = await patientsRes.json();
        setPatients(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculations
  // --- REPLACE THIS SECTION ---
  const totalRevenue = payments
    .filter((p) => p.payment_status?.toLowerCase() === "completed")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  // New variable to count only completed ones
  const successfulPaymentsCount = payments.filter(
    (p) => p.payment_status?.toLowerCase() === "completed",
  ).length;

  const pendingCount = payments.filter(
    (p) => p.payment_status?.toLowerCase() === "pending",
  ).length;
  // -----------------------------

  const filteredPayments = payments.filter((payment) => {
    const patientName = payment.patient?.name || "";
    const matchesSearch =
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.payment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `/api/payments/${selectedPayment?.id}`
        : "/api/payments";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (response.ok) {
        fetchData();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this payment record?")) {
      try {
        const res = await fetch(`/api/payments/${id}`, { method: "DELETE" });
        if (res.ok) fetchData();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      patient_id: "",
      amount: "",
      payment_method: "cash",
      payment_status: "pending",
      notes: "",
      invoice_number: "",
    });
    setIsEditing(false);
    setSelectedPayment(null);
  };

  const openEditDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setFormData({
      patient_id: payment.patient_id || "",
      amount: payment.amount.toString(),
      payment_method: payment.payment_method,
      payment_status: payment.payment_status,
      notes: payment.notes || "",
      invoice_number: payment.invoice_number || "",
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      failed: "bg-rose-50 text-rose-700 border-rose-200",
      refunded: "bg-blue-50 text-blue-700 border-blue-200",
    };
    return (
      <Badge
        variant="outline"
        className={`${styles[status] || ""} capitalize rounded-full px-3 py-1 font-medium`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Premium Header */}
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
                Payments <span className="text-[#BFA37C]">Vault</span>
              </h1>
            </div>

            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button className="bg-[#BFA37C] hover:bg-[#D4B896] text-[#0A2342] font-bold rounded-xl px-6 h-11 transition-all shadow-lg active:scale-95">
                  <Plus className="h-5 w-5 mr-2" /> Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif text-[#0A2342]">
                    {isEditing ? "Update Entry" : "New Payment"}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the financial details below.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 py-4">
                  <div className="space-y-2">
                    <Label>Patient</Label>
                    <Select
                      value={formData.patient_id}
                      onValueChange={(v) =>
                        setFormData({ ...formData, patient_id: v })
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        className="rounded-xl"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Method</Label>
                      <Select
                        value={formData.payment_method}
                        onValueChange={(v) =>
                          setFormData({ ...formData, payment_method: v })
                        }
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.payment_status}
                      onValueChange={(v) =>
                        setFormData({ ...formData, payment_status: v })
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#0A2342] text-white py-6 rounded-xl text-lg font-semibold hover:bg-[#0D2B4D]"
                  >
                    {isEditing ? "Save Changes" : "Confirm Payment"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              label: "Net Revenue",
              val: `PKR ${totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: "text-emerald-600",
              bg: "bg-emerald-100/50",
            },
            {
              label: "Successful Payments",
              val: successfulPaymentsCount,
              icon: CheckCircle,
              color: "text-blue-600",
              bg: "bg-blue-100/50",
            },
            {
              label: "Outstanding Dues",
              val: pendingCount,
              icon: Clock,
              color: "text-amber-600",
              bg: "bg-amber-100/50",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="border-none shadow-[0_30px_60px_rgba(0,0,0,0.05)] rounded-[2rem] overflow-hidden bg-white"
            >
              <CardContent className="p-8 flex items-center gap-6">
                <div className={`p-5 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-9 w-9" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black text-[#0A2342]">
                    {stat.val}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by patient or invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-7 rounded-2xl border-none shadow-sm text-lg focus-visible:ring-[#BFA37C] bg-white"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px] py-7 rounded-2xl border-none shadow-sm bg-white font-medium">
                <Filter className="h-4 w-4 mr-2 text-[#BFA37C]" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Records</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Records Table */}
        <Card className="border-none shadow-[0_40px_80px_rgba(0,0,0,0.06)] rounded-[2.5rem] bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-[#FAF8F5]">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="py-6 px-8 font-bold text-[#0A2342]">
                  PATIENT
                </TableHead>
                <TableHead className="font-bold text-[#0A2342]">
                  INVOICE
                </TableHead>
                <TableHead className="font-bold text-[#0A2342]">
                  AMOUNT
                </TableHead>
                <TableHead className="font-bold text-[#0A2342]">
                  METHOD
                </TableHead>
                <TableHead className="font-bold text-[#0A2342]">
                  STATUS
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
                    colSpan={7}
                    className="text-center py-24 text-gray-400 font-medium"
                  >
                    Syncing with secure servers...
                  </TableCell>
                </TableRow>
              ) : filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-24 text-gray-400"
                  >
                    No transactions found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="hover:bg-gray-50/50 transition-all border-b border-gray-100 last:border-none"
                  >
                    <TableCell className="py-6 px-8">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0A2342] text-lg">
                          {payment.patient?.name || "Walk-in Patient"}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {payment.patient?.email || "No email provided"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500 font-mono font-medium">
                      {payment.invoice_number}
                    </TableCell>
                    <TableCell>
                      <span className="font-black text-[#0A2342]">
                        PKR {Number(payment.amount).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-500 font-medium">
                        <CreditCard className="h-4 w-4 text-[#BFA37C]" />
                        <span className="capitalize">
                          {payment.payment_method}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(payment.payment_status)}
                    </TableCell>
                    <TableCell className="text-gray-400 font-medium">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(payment)}
                          className="rounded-full hover:bg-amber-50 hover:text-[#BFA37C]"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(payment.id)}
                          className="rounded-full hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
