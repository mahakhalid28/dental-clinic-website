"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Edit,
  Save,
  ArrowLeft,
  AlertCircle
} from "lucide-react";

interface ContactDetail {
  id: string | number;
  type: string;
  line_1: string;
  line_2: string | null;
  link: string | null;
  link_text: string | null;
}

export default function ContactManagement() {
  const [contacts, setContacts] = useState<ContactDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactDetail | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    line_1: "",
    line_2: "",
    link: "",
    link_text: ""
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact: ContactDetail) => {
    setSelectedContact(contact);
    setFormData({
      type: contact.type,
      line_1: contact.line_1,
      line_2: contact.line_2 || "",
      link: contact.link || "",
      link_text: contact.link_text || ""
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedContact) return;

    try {
      const response = await fetch(`/api/contact/${selectedContact.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: formData.type,
          line_1: formData.line_1,
          line_2: formData.line_2 || null,
          link: formData.link || null,
          link_text: formData.link_text || null
        }),
      });

      if (response.ok) {
        fetchContacts();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save contact:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      type: "",
      line_1: "",
      line_2: "",
      link: "",
      link_text: ""
    });
    setSelectedContact(null);
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "call us":
        return <Phone className="h-6 w-6 text-blue-600" />;
      case "email us":
        return <Mail className="h-6 w-6 text-purple-600" />;
      case "visit us":
        return <MapPin className="h-6 w-6 text-red-600" />;
      case "hours":
        return <Clock className="h-6 w-6 text-green-600" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-600" />;
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
                Contact Details Management
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#0A2342" }}>Contact Information</CardTitle>
            <CardDescription>
              Edit contact details displayed on the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2342] mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading contact details...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          {getIcon(contact.type)}
                        </div>
                        <h3 className="text-lg font-semibold" style={{ color: "#0A2342" }}>
                          {contact.type}
                        </h3>
                      </div>
                      <Dialog open={isDialogOpen && selectedContact?.id === contact.id} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(contact)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle style={{ color: "#0A2342" }}>
                              Edit {contact.type}
                            </DialogTitle>
                            <DialogDescription>
                              Update the contact information
                            </DialogDescription>
                          </DialogHeader>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <Label htmlFor="type">Type *</Label>
                              <Input
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="line_1">Primary Information *</Label>
                              <Input
                                id="line_1"
                                value={formData.line_1}
                                onChange={(e) => setFormData({...formData, line_1: e.target.value})}
                                placeholder="e.g., Phone number, email, address, etc."
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="line_2">Secondary Information</Label>
                              <Input
                                id="line_2"
                                value={formData.line_2}
                                onChange={(e) => setFormData({...formData, line_2: e.target.value})}
                                placeholder="e.g., Additional address line, second line of hours"
                              />
                            </div>

                            <div>
                              <Label htmlFor="link">Link (optional)</Label>
                              <Input
                                id="link"
                                type="url"
                                value={formData.link}
                                onChange={(e) => setFormData({...formData, link: e.target.value})}
                                placeholder="https://maps.app.goo.gl/..."
                              />
                            </div>

                            <div>
                              <Label htmlFor="link_text">Link Text (optional)</Label>
                              <Input
                                id="link_text"
                                value={formData.link_text}
                                onChange={(e) => setFormData({...formData, link_text: e.target.value})}
                                placeholder="e.g., Get Directions"
                              />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit" style={{ backgroundColor: "#0A2342" }}>
                                Save Changes
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">Primary:</span> {contact.line_1}
                      </p>
                      {contact.line_2 && (
                        <p className="text-gray-700">
                          <span className="font-medium">Secondary:</span> {contact.line_2}
                        </p>
                      )}
                      {contact.link && (
                        <p className="text-blue-600 hover:underline">
                          <a href={contact.link} target="_blank" rel="noopener noreferrer">
                            {contact.link_text || contact.link}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && contacts.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No contact details found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}