"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Stethoscope,
  FileText,
  UserCheck,
  LogOut,
  BarChart3,
  Calendar,
  Settings,
  Phone
} from "lucide-react";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      href: "/admin",
      description: "Overview and statistics"
    },
    {
      id: "patients",
      label: "Patients",
      icon: Users,
      href: "/admin/patients",
      description: "Manage patient records"
    },
    {
      id: "services",
      label: "Services",
      icon: Stethoscope,
      href: "/admin/services",
      description: "Manage dental services"
    },
    {
      id: "dentists",
      label: "Dentists",
      icon: UserCheck,
      href: "/admin/dentists",
      description: "Manage dentist profiles"
    },
    {
      id: "about",
      label: "About Info",
      icon: FileText,
      href: "/admin/about",
      description: "Manage clinic information"
    },
    {
      id: "contact",
      label: "Contact Details",
      icon: Phone,
      href: "/admin/contact",
      description: "Manage contact information"
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      href: "/admin/appointments",
      description: "View appointment bookings"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div
                className="text-2xl font-semibold"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#0A2342"
                }}
              >
                Dental Ease Admin
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-[#0A2342] transition-colors"
              >
                ← Back to Website
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  // TODO: Implement logout
                  window.location.href = '/admin/login';
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg" style={{ color: "#0A2342" }}>
                  Admin Panel
                </CardTitle>
                <CardDescription>
                  Manage your dental clinic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#0A2342] text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <Icon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-75">{item.description}</div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Welcome Section */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#0A2342" }}>
                    Welcome to Admin Dashboard
                  </CardTitle>
                  <CardDescription>
                    Manage your dental clinic efficiently
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Use the sidebar to navigate between different sections. You can view and edit patient records,
                    manage services, update dentist information, and modify clinic details.
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-blue-100">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                        <p className="text-sm text-gray-600">Total Patients</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-green-100">
                        <Stethoscope className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                        <p className="text-sm text-gray-600">Active Services</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-purple-100">
                        <UserCheck className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                        <p className="text-sm text-gray-600">Dentists</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-orange-100">
                        <Calendar className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                        <p className="text-sm text-gray-600">Appointments</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#0A2342" }}>
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/admin/patients">
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <Users className="h-4 w-4" />
                        Manage Patients
                      </Button>
                    </Link>
                    <Link href="/admin/services">
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <Stethoscope className="h-4 w-4" />
                        Manage Services
                      </Button>
                    </Link>
                    <Link href="/admin/dentists">
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <UserCheck className="h-4 w-4" />
                        Manage Dentists
                      </Button>
                    </Link>
                    <Link href="/admin/about">
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <FileText className="h-4 w-4" />
                        Edit About Info
                      </Button>
                    </Link>
                    <Link href="/admin/contact">
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <Phone className="h-4 w-4" />
                        Manage Contact Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}