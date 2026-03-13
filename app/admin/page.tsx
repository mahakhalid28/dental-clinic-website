"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Stethoscope,
  FileText,
  UserCheck,
  LogOut,
  BarChart3,
  Calendar,
  Phone,
  CreditCard,
  MessageSquare,
  Star,
} from "lucide-react";

interface DashboardStats {
  patients: number;
  dentists: number;
  services: number;
  appointments: number;
  todayAppointments: number;
  pendingAppointments: number;
}

interface Admin {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    patients: 0,
    dentists: 0,
    services: 0,
    appointments: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      localStorage.removeItem("admin");
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("admin");
      window.location.href = "/admin/login";
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      href: "/admin",
      description: "Overview and statistics",
    },
    {
      id: "patients",
      label: "Patients",
      icon: Users,
      href: "/admin/patients",
      description: "Manage patient records",
    },
    {
      id: "services",
      label: "Services",
      icon: Stethoscope,
      href: "/admin/services",
      description: "Manage dental services",
    },
    {
      id: "dentists",
      label: "Dentists",
      icon: UserCheck,
      href: "/admin/dentists",
      description: "Manage dentist profiles",
    },
    {
      id: "about",
      label: "About Info",
      icon: FileText,
      href: "/admin/about",
      description: "Manage clinic information",
    },
    {
      id: "contact",
      label: "Contact Details",
      icon: Phone,
      href: "/admin/contact",
      description: "Manage contact information",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      href: "/admin/appointments",
      description: "View appointment bookings",
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
      href: "/admin/payments",
      description: "Manage payments",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      href: "/admin/messages",
      description: "Contact form messages",
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
      href: "/admin/reviews",
      description: "Patient reviews",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0A2342 0%, #0D2B4D 50%, #0A2342 100%)",
      }}
    >
      {/* Header */}
      <header
        className="shadow-sm"
        style={{
          background: "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
          borderBottom: "1px solid rgba(191,163,124,0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div
              className="text-2xl font-semibold text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Dental Ease Admin
            </div>

            <div className="flex items-center gap-4">
              {admin && (
                <span className="text-sm text-gray-200">
                  Welcome, {admin.first_name} {admin.last_name}
                </span>
              )}

              <Link
                href="/"
                className="text-sm text-gray-200 hover:text-[#BFA37C] transition-colors"
              >
                ← Back to Website
              </Link>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-[#BFA37C] text-[#0A2342]"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card
              className="border-0"
              style={{
                background: "linear-gradient(180deg,#FFFFFF 0%,#FAF8F5 100%)",
                boxShadow:
                  "0 20px 60px -10px rgba(0,0,0,0.35),0 0 0 1px rgba(191,163,124,0.2)",
              }}
            >
              <CardHeader>
                <CardTitle style={{ color: "#0A2342" }}>
                  Admin Panel
                </CardTitle>
                <CardDescription>Manage your dental clinic</CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        activeSection === item.id
                          ? "text-white"
                          : "text-gray-700 hover:bg-[#0A2342]/10"
                      }`}
                      style={
                        activeSection === item.id
                          ? {
                              background:
                                "linear-gradient(135deg,#0A2342 0%,#0D2B4D 100%)",
                            }
                          : {}
                      }
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{
                          color:
                            activeSection === item.id
                              ? "#FFFFFF"
                              : "#BFA37C",
                        }}
                      />

                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-75">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome */}
            <Card
              className="border-0"
              style={{
                background: "linear-gradient(180deg,#FFFFFF 0%,#FAF8F5 100%)",
                boxShadow:
                  "0 15px 50px -10px rgba(0,0,0,0.3),0 0 0 1px rgba(191,163,124,0.15)",
              }}
            >
              <CardHeader>
                <CardTitle
                  style={{
                    color: "#0A2342",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  Welcome to Admin Dashboard
                </CardTitle>

                <CardDescription>
                  Manage your dental clinic efficiently
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600">
                  Use the sidebar to navigate between different sections. You
                  can view and edit patient records, manage services, update
                  dentist information, and modify clinic details.
                </p>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Patients",
                  value: stats.patients,
                  icon: Users,
                },
                {
                  label: "Active Services",
                  value: stats.services,
                  icon: Stethoscope,
                },
                {
                  label: "Dentists",
                  value: stats.dentists,
                  icon: UserCheck,
                },
                {
                  label: "Appointments",
                  value: stats.appointments,
                  icon: Calendar,
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={i}
                    className="border-0"
                    style={{
                      background:
                        "linear-gradient(180deg,#FFFFFF 0%,#FAF8F5 100%)",
                      boxShadow:
                        "0 15px 40px -10px rgba(0,0,0,0.25),0 0 0 1px rgba(191,163,124,0.15)",
                    }}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{
                          background: "rgba(191,163,124,0.15)",
                        }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: "#BFA37C" }}
                        />
                      </div>

                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {loading ? "--" : item.value}
                        </p>
                        <p className="text-sm text-gray-600">{item.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card
              className="border-0"
              style={{
                background: "linear-gradient(180deg,#FFFFFF 0%,#FAF8F5 100%)",
                boxShadow:
                  "0 15px 50px -10px rgba(0,0,0,0.3),0 0 0 1px rgba(191,163,124,0.15)",
              }}
            >
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
                  {[
                    { href: "/admin/patients", label: "Manage Patients", icon: Users },
                    { href: "/admin/services", label: "Manage Services", icon: Stethoscope },
                    { href: "/admin/dentists", label: "Manage Dentists", icon: UserCheck },
                    { href: "/admin/about", label: "Edit About Info", icon: FileText },
                    { href: "/admin/contact", label: "Manage Contact Details", icon: Phone },
                  ].map((item, i) => {
                    const Icon = item.icon;

                    return (
                      <Link key={i} href={item.href}>
                        <Button
                          className="w-full justify-start gap-2 border-[#BFA37C] text-[#0A2342] hover:bg-[#BFA37C]/10"
                          variant="outline"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}