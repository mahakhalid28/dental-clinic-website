"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  Clock,
  User,
  Stethoscope,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

interface Appointment {
  id: string;
  patient_id: string;
  dentist_id: string | null;
  service_id: string | null;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  patient?: { first_name: string; last_name: string; email: string; phone: string };
  dentist?: { name: string };
  service?: { service_name: string };
}

export default function AppointmentsManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [dentists, setDentists] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    patient_id: "",
    dentist_id: "",
    service_id: "",
    appointment_date: "",
    appointment_time: "",
    status: "scheduled",
    notes: ""
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [appointmentsRes, patientsRes, dentistsRes, servicesRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/patients"),
        fetch("/api/dentists"),
        fetch("/api/services")
      ]);

      if (appointmentsRes.ok) {
        const appointmentsData = await appointmentsRes.json();
        setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);
      } else {
        console.error("Failed to fetch appointments:", appointmentsRes.status);
        setAppointments([]);
      }

      if (patientsRes.ok) {
        const patientsData = await patientsRes.json();
        setPatients(Array.isArray(patientsData) ? patientsData : []);
      }
      if (dentistsRes.ok) {
        const dentistsData = await dentistsRes.json();
        setDentists(Array.isArray(dentistsData) ? dentistsData : []);
      }
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        setServices(Array.isArray(servicesData) ? servicesData : []);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patient?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient?.phone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      patient_id: appointment.patient_id,
      dentist_id: appointment.dentist_id || "",
      service_id: appointment.service_id || "",
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      status: appointment.status,
      notes: appointment.notes || ""
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAppointment) return;

    try {
      const response = await fetch(`/api/appointments/${selectedAppointment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchAllData();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save appointment:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAllData();
      }
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      patient_id: "",
      dentist_id: "",
      service_id: "",
      appointment_date: "",
      appointment_time: "",
      status: "scheduled",
      notes: ""
    });
    setSelectedAppointment(null);
    setIsEditing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      case "no-show":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">No Show</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "no-show":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Calendar className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-gray-600 hover:text-[#0A2342] transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Dashboard
              </Link>
              <div
                className="text-xl font-semibold"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#0A2342"
                }}
              >
                Appointments Management
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by patient name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="secondary" className="px-3 py-1">
              {filteredAppointments.length} appointments
            </Badge>
          </div>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#0A2342" }}>Appointment Records</CardTitle>
            <CardDescription>
              View and manage all scheduled appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2342] mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading appointments...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Dentist</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          <div>
                            {appointment.patient?.first_name} {appointment.patient?.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.patient?.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(appointment.appointment_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            {appointment.appointment_time}
                          </div>
                        </TableCell>
                        <TableCell>
                          {appointment.service?.service_name || "Not assigned"}
                        </TableCell>
                        <TableCell>
                          {appointment.dentist?.name || "Not assigned"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(appointment.status)}
                            {getStatusBadge(appointment.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={appointment.notes || ""}>
                            {appointment.notes || "-"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog open={isDialogOpen && selectedAppointment?.id === appointment.id} onOpenChange={setIsDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(appointment)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle style={{ color: "#0A2342" }}>
                                    Edit Appointment
                                  </DialogTitle>
                                  <DialogDescription>
                                    Update appointment details
                                  </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="patient_id">Patient *</Label>
                                      <Select value={formData.patient_id} onValueChange={(value) => setFormData({...formData, patient_id: value})}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select patient" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {patients.map((p) => (
                                            <SelectItem key={p.id} value={p.id}>
                                              {p.first_name} {p.last_name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label htmlFor="service_id">Service</Label>
                                      <Select value={formData.service_id} onValueChange={(value) => setFormData({...formData, service_id: value})}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="">None</SelectItem>
                                          {services.map((s) => (
                                            <SelectItem key={s.id} value={s.id}>
                                              {s.service_name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="dentist_id">Dentist</Label>
                                      <Select value={formData.dentist_id} onValueChange={(value) => setFormData({...formData, dentist_id: value})}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select dentist" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="">None</SelectItem>
                                          {dentists.map((d) => (
                                            <SelectItem key={d.id} value={d.id}>
                                              {d.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label htmlFor="status">Status</Label>
                                      <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="scheduled">Scheduled</SelectItem>
                                          <SelectItem value="completed">Completed</SelectItem>
                                          <SelectItem value="cancelled">Cancelled</SelectItem>
                                          <SelectItem value="no-show">No Show</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="appointment_date">Date *</Label>
                                      <Input
                                        id="appointment_date"
                                        type="date"
                                        value={formData.appointment_date}
                                        onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                                        required
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="appointment_time">Time *</Label>
                                      <Input
                                        id="appointment_time"
                                        type="time"
                                        value={formData.appointment_time}
                                        onChange={(e) => setFormData({...formData, appointment_time: e.target.value})}
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                      id="notes"
                                      value={formData.notes}
                                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                      rows={3}
                                      placeholder="Any additional notes about the appointment"
                                    />
                                  </div>

                                  <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button type="submit" style={{ backgroundColor: "#0A2342" }}>
                                      Save Appointment
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(appointment.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {!loading && filteredAppointments.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No appointments found</p>
                {searchTerm || statusFilter !== "all" && (
                  <p className="text-sm text-gray-500 mt-1">
                    Try adjusting your filters
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}