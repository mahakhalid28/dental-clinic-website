"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Save,
  ArrowLeft,
  Building,
  Users,
  Award,
  Heart
} from "lucide-react";

interface AboutInfo {
  id: string;
  clinic_name: string;
  description: string;
  mission: string;
  vision: string;
  values: string;
  history: string;
  address: string;
  phone: string;
  email: string;
  working_hours: string;
  emergency_contact: string;
  created_at: string;
  updated_at: string;
}

export default function AboutManagement() {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    clinic_name: "",
    description: "",
    mission: "",
    vision: "",
    values: "",
    history: "",
    address: "",
    phone: "",
    email: "",
    working_hours: "",
    emergency_contact: ""
  });

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      const response = await fetch("/api/about");
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const info = data[0];
          setAboutInfo(info);
          setFormData({
            clinic_name: info.clinic_name || "",
            description: info.description || "",
            mission: info.mission || "",
            vision: info.vision || "",
            values: info.values || "",
            history: info.history || "",
            address: info.address || "",
            phone: info.phone || "",
            email: info.email || "",
            working_hours: info.working_hours || "",
            emergency_contact: info.emergency_contact || ""
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch about info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = aboutInfo ? `/api/about/${aboutInfo.id}` : "/api/about";
      const method = aboutInfo ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setAboutInfo(updatedData);
        alert("About information saved successfully!");
      } else {
        alert("Failed to save about information");
      }
    } catch (error) {
      console.error("Failed to save about info:", error);
      alert("Failed to save about information");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2342] mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading about information...</p>
        </div>
      </div>
    );
  }

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
                About Information Management
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2"
              style={{ backgroundColor: "#0A2342" }}
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="mission" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Mission & Vision
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#0A2342" }}>General Information</CardTitle>
                  <CardDescription>
                    Basic clinic information displayed on the website
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="clinic_name">Clinic Name *</Label>
                    <Input
                      id="clinic_name"
                      value={formData.clinic_name}
                      onChange={(e) => setFormData({...formData, clinic_name: e.target.value})}
                      placeholder="Dental Ease Clinic"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Clinic Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      placeholder="Brief description of your clinic and services"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mission" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#0A2342" }}>Mission, Vision & Values</CardTitle>
                  <CardDescription>
                    Define your clinic's purpose and principles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="mission">Mission Statement</Label>
                    <Textarea
                      id="mission"
                      value={formData.mission}
                      onChange={(e) => setFormData({...formData, mission: e.target.value})}
                      rows={3}
                      placeholder="Our mission is to provide exceptional dental care..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="vision">Vision Statement</Label>
                    <Textarea
                      id="vision"
                      value={formData.vision}
                      onChange={(e) => setFormData({...formData, vision: e.target.value})}
                      rows={3}
                      placeholder="Our vision is to be the leading dental clinic..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="values">Core Values</Label>
                    <Textarea
                      id="values"
                      value={formData.values}
                      onChange={(e) => setFormData({...formData, values: e.target.value})}
                      rows={4}
                      placeholder="Quality care, patient satisfaction, integrity, innovation..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#0A2342" }}>Contact Information</CardTitle>
                  <CardDescription>
                    Contact details and operating hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="info@dentalclinic.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Clinic Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={3}
                      placeholder="123 Dental Street, City, State, ZIP"
                    />
                  </div>

                  <div>
                    <Label htmlFor="working_hours">Working Hours</Label>
                    <Textarea
                      id="working_hours"
                      value={formData.working_hours}
                      onChange={(e) => setFormData({...formData, working_hours: e.target.value})}
                      rows={4}
                      placeholder="Monday - Friday: 9:00 AM - 6:00 PM&#10;Saturday: 9:00 AM - 2:00 PM&#10;Sunday: Closed"
                    />
                  </div>

                  <div>
                    <Label htmlFor="emergency_contact">Emergency Contact</Label>
                    <Input
                      id="emergency_contact"
                      value={formData.emergency_contact}
                      onChange={(e) => setFormData({...formData, emergency_contact: e.target.value})}
                      placeholder="Emergency phone number for urgent cases"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#0A2342" }}>Clinic History</CardTitle>
                  <CardDescription>
                    Tell your clinic's story and background
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="history">Clinic History</Label>
                    <Textarea
                      id="history"
                      value={formData.history}
                      onChange={(e) => setFormData({...formData, history: e.target.value})}
                      rows={6}
                      placeholder="Founded in 2005, Dental Ease Clinic has been serving the community for over 15 years..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button at Bottom */}
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8"
              style={{ backgroundColor: "#0A2342" }}
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}