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
import { Badge } from "@/components/ui/badge";
import {
  UserCheck,
  Plus,
  Search,
  Edit,
  Trash2,
  GraduationCap,
  Award,
  ArrowLeft,
} from "lucide-react";

interface Dentist {
  id: string;
  name: string;
  specialization: string;
  experience_years: number;
  qualifications: string;
  bio: string;
  image?: string;
  created_at: string;
}

export default function DentistsManagement() {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience_years: "",
    qualifications: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    fetchDentists();
  }, []);

  const fetchDentists = async () => {
    try {
      const response = await fetch("/api/dentists");
      if (response.ok) {
        const data = await response.json();
        setDentists(data);
      }
    } catch (error) {
      console.error("Failed to fetch dentists:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDentists = dentists.filter(
    (dentist) =>
      (dentist.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (dentist.specialization?.toLowerCase() || "").includes(
        searchTerm.toLowerCase(),
      ) ||
      (dentist.qualifications?.toLowerCase() || "").includes(
        searchTerm.toLowerCase(),
      ),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = isEditing
        ? `/api/dentists/${selectedDentist?.id}`
        : "/api/dentists";
      const method = isEditing ? "PUT" : "POST";

      const submitData = {
        ...formData,
        experience_years: parseInt(formData.experience_years) || 0,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        fetchDentists();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save dentist:", error);
    }
  };

  const handleEdit = (dentist: Dentist) => {
    setSelectedDentist(dentist);
    setFormData({
      name: dentist.name,
      specialization: dentist.specialization,
      experience_years: dentist.experience_years?.toString() || "",
      qualifications: dentist.qualifications,
      bio: dentist.bio,
      image: dentist.image || "",
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dentist?")) return;

    try {
      const response = await fetch(`/api/dentists/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchDentists();
      }
    } catch (error) {
      console.error("Failed to delete dentist:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      experience_years: "",
      qualifications: "",
      bio: "",
      image: "",
    });
    setSelectedDentist(null);
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
                Dentists Management
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
                placeholder="Search dentists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {filteredDentists.length} dentists
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
                Add Dentist
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle style={{ color: "#0A2342" }}>
                  {isEditing ? "Edit Dentist" : "Add New Dentist"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing
                    ? "Update dentist information"
                    : "Enter dentist details"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialization">Specialization *</Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialization: e.target.value,
                        })
                      }
                      placeholder="e.g., General Dentistry"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience_years">
                      Years of Experience
                    </Label>
                    <Input
                      id="experience_years"
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experience_years: e.target.value,
                        })
                      }
                      placeholder="5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="qualifications">Qualifications *</Label>
                  <Textarea
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualifications: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="e.g., DDS, University of Dentistry, Board Certified"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    placeholder="Brief professional biography and approach to patient care"
                  />
                </div>

                <div>
                  <Label htmlFor="image">
                    Profile Image Filename (optional)
                  </Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="e.g., doctor-1.jpg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Image should be placed in the public/images folder
                  </p>
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
                    {isEditing ? "Update Dentist" : "Add Dentist"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Dentists Table */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#0A2342" }}>Dentist Profiles</CardTitle>
            <CardDescription>
              View and manage dentist information and profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2342] mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading dentists...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Qualifications</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDentists.map((dentist) => (
                    <TableRow key={dentist.id}>
                      <TableCell className="font-medium">
                        {dentist.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {dentist.specialization}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {dentist.experience_years ? (
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {dentist.experience_years} years
                          </div>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div
                          className="max-w-xs truncate"
                          title={dentist.qualifications}
                        >
                          {dentist.qualifications}
                        </div>
                      </TableCell>
                      <TableCell>
                        {dentist.image ? (
                          <Badge variant="secondary" className="text-xs">
                            {dentist.image}
                          </Badge>
                        ) : (
                          <span className="text-gray-500 text-sm">Default</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(dentist)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(dentist.id)}
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

            {!loading && filteredDentists.length === 0 && (
              <div className="text-center py-8">
                <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No dentists found</p>
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
