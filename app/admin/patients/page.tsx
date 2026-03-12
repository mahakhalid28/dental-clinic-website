"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  gender: string;
  city: string;
  emergency_phone: string;
  blood_group: string;
  allergies: string;
  current_medications: string;
  history_diabetes: boolean;
  history_heart: boolean;
  history_hypertension: boolean;
  history_bleeding: boolean;
  history_smoker: boolean;
  history_pregnant: boolean;
  notes: string;
  is_active: boolean;
  created_at: string;
}

export default function PatientsManagement() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state matching database columns
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    gender: "",
    city: "",
    emergency_phone: "",
    blood_group: "",
    allergies: "",
    current_medications: "",
    history_diabetes: false,
    history_heart: false,
    history_hypertension: false,
    history_bleeding: false,
    history_smoker: false,
    history_pregnant: false,
    notes: "",
    is_active: true,
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/patients");
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone?.includes(searchTerm),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = isEditing
        ? `/api/patients/${selectedPatient?.id}`
        : "/api/patients";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPatients();
        setIsDialogOpen(false);
        resetForm();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(
          "Failed to save patient: " + (errorData.error || "Unknown error"),
        );
      }
    } catch (error) {
      console.error("Failed to save patient:", error);
      alert("Failed to save patient");
    }
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormData({
      name: patient.name || "",
      email: patient.email || "",
      phone: patient.phone || "",
      date_of_birth: patient.date_of_birth || "",
      address: patient.address || "",
      gender: patient.gender || "",
      city: patient.city || "",
      emergency_phone: patient.emergency_phone || "",
      blood_group: patient.blood_group || "",
      allergies: patient.allergies || "",
      current_medications: patient.current_medications || "",
      history_diabetes: patient.history_diabetes || false,
      history_heart: patient.history_heart || false,
      history_hypertension: patient.history_hypertension || false,
      history_bleeding: patient.history_bleeding || false,
      history_smoker: patient.history_smoker || false,
      history_pregnant: patient.history_pregnant || false,
      notes: patient.notes || "",
      is_active: patient.is_active !== false,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    try {
      const response = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPatients();
      }
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      address: "",
      gender: "",
      city: "",
      emergency_phone: "",
      blood_group: "",
      allergies: "",
      current_medications: "",
      history_diabetes: false,
      history_heart: false,
      history_hypertension: false,
      history_bleeding: false,
      history_smoker: false,
      history_pregnant: false,
      notes: "",
      is_active: true,
    });
    setSelectedPatient(null);
    setIsEditing(false);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
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
                  color: "#0A2342",
                }}
              >
                Patients Management
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {filteredPatients.length} patients
            </Badge>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={openAddDialog}
                className="flex items-center gap-2"
                style={{ backgroundColor: "#0A2342" }}
              >
                <Plus className="h-4 w-4" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle style={{ color: "#0A2342" }}>
                  {isEditing ? "Edit Patient" : "Add New Patient"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing
                    ? "Update patient information"
                    : "Enter patient details"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="e.g., Ali Khan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      placeholder="0300-1234567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date_of_birth: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="blood_group">Blood Group</Label>
                    <Select
                      value={formData.blood_group}
                      onValueChange={(value) =>
                        setFormData({ ...formData, blood_group: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="e.g., Lahore"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency_phone">Emergency Phone</Label>
                    <Input
                      id="emergency_phone"
                      value={formData.emergency_phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergency_phone: e.target.value,
                        })
                      }
                      placeholder="0300-7654321"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) =>
                        setFormData({ ...formData, allergies: e.target.value })
                      }
                      rows={2}
                      placeholder="e.g., Penicillin, Latex"
                    />
                  </div>
                  <div>
                    <Label htmlFor="current_medications">
                      Current Medications
                    </Label>
                    <Textarea
                      id="current_medications"
                      value={formData.current_medications}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          current_medications: e.target.value,
                        })
                      }
                      rows={2}
                      placeholder="e.g., Aspirin, Metformin"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">
                    Medical History
                  </Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="history_diabetes"
                        checked={formData.history_diabetes}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            history_diabetes: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor="history_diabetes" className="font-normal">
                        Diabetes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="history_heart"
                        checked={formData.history_heart}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            history_heart: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor="history_heart" className="font-normal">
                        Heart Disease
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="history_hypertension"
                        checked={formData.history_hypertension}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            history_hypertension: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="history_hypertension"
                        className="font-normal"
                      >
                        Hypertension
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="history_bleeding"
                        checked={formData.history_bleeding}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            history_bleeding: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor="history_bleeding" className="font-normal">
                        Bleeding Disorder
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="history_smoker"
                        checked={formData.history_smoker}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            history_smoker: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor="history_smoker" className="font-normal">
                        Smoker
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="history_pregnant"
                        checked={formData.history_pregnant}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            history_pregnant: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor="history_pregnant" className="font-normal">
                        Pregnant
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={2}
                    placeholder="Any additional notes..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" style={{ backgroundColor: "#0A2342" }}>
                    {isEditing ? "Update Patient" : "Add Patient"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#0A2342" }}>Patient Records</CardTitle>
            <CardDescription>
              View and manage all patient information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2342] mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading patients...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        <div>
                          {patient.name}
                          {patient.gender && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              {patient.gender}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            {patient.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {patient.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.city || "-"}</TableCell>
                      <TableCell>
                        {patient.blood_group ? (
                          <Badge variant="secondary">
                            {patient.blood_group}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(patient.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(patient)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(patient.id)}
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
            )}

            {!loading && filteredPatients.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No patients found</p>
                {searchTerm && (
                  <p className="text-sm text-gray-500 mt-1">
                    Try adjusting your search terms
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
