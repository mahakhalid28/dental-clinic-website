"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  TrendingUp,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface DashboardStats {
  patients: number;
  dentists: number;
  appointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  services: number;
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      description: "Overview & statistics",
    },
    {
      id: "patients",
      label: "Patients",
      icon: Users,
      href: "/admin/patients",
      description: "Patient records",
    },
    {
      id: "services",
      label: "Services",
      icon: Stethoscope,
      href: "/admin/services",
      description: "Dental services",
    },
    {
      id: "dentists",
      label: "Dentists",
      icon: UserCheck,
      href: "/admin/dentists",
      description: "Dentist profiles",
    },
  
    {
      id: "contact",
      label: "Contact Details",
      icon: Phone,
      href: "/admin/contact",
      description: "Contact information",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      href: "/admin/appointments",
      description: "Appointment bookings",
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
      description: "Contact messages",
    }
  ];

  const statCards = [
    {
      label: "Total Patients",
      value: stats.patients,
      icon: Users,
      trend: "+12%",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Services",
      value: stats.services,
      icon: Stethoscope,
      trend: "+3%",
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Dentists",
      value: stats.dentists,
      icon: UserCheck,
      trend: "Stable",
      color: "from-violet-500 to-violet-600",
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      label: "Appointments",
      value: stats.appointments,
      icon: Calendar,
      trend: "+8%",
      color: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const quickActions = [
    {
      href: "/admin/patients",
      label: "Manage Patients",
      icon: Users,
      desc: "View & edit records",
    },
    {
      href: "/admin/services",
      label: "Manage Services",
      icon: Stethoscope,
      desc: "Update offerings",
    },
    {
      href: "/admin/dentists",
      label: "Manage Dentists",
      icon: UserCheck,
      desc: "Staff profiles",
    },
    {
      href: "/admin/about",
      label: "Edit About Info",
      icon: FileText,
      desc: "Clinic details",
    },
    {
      href: "/admin/contact",
      label: "Contact Details",
      icon: Phone,
      desc: "Update info",
    },
    {
      href: "/admin/appointments",
      label: "Appointments",
      icon: Calendar,
      desc: "View bookings",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .dash-root {
          min-height: 100vh;
          background: #F0F2F5;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ── TOP HEADER ── */
        .dash-header {
          background: #0A2342;
          border-bottom: 1px solid rgba(191,163,124,0.3);
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 2px 20px rgba(10,35,66,0.4);
        }

        .dash-logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dash-logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #C5A27D;
          display: inline-block;
        }

        .dash-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .dash-welcome-pill {
          background: rgba(197,162,125,0.15);
          border: 1px solid rgba(197,162,125,0.3);
          color: #C5A27D;
          padding: 4px 14px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .dash-back-link {
          color: rgba(255,255,255,0.65);
          font-size: 0.82rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .dash-back-link:hover { color: #C5A27D; }

        .dash-logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid rgba(197,162,125,0.5);
          color: #C5A27D;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .dash-logout-btn:hover {
          background: rgba(197,162,125,0.15);
          border-color: #C5A27D;
          color: #fff;
        }

        /* ── BODY LAYOUT ── */
        .dash-body {
          display: flex;
          flex: 1;
        }

        /* ── SIDEBAR ── */
        .dash-sidebar {
          width: 260px;
          min-height: calc(100vh - 64px);
          background: #0A2342;
          flex-shrink: 0;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          overflow-y: auto;
        }

        .sidebar-section-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(197,162,125,0.5);
          padding: 0.75rem 0.75rem 0.25rem;
          margin-top: 0.5rem;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.18s ease;
          cursor: pointer;
          position: relative;
        }

        .sidebar-link:hover {
          background: rgba(197,162,125,0.12);
        }

        .sidebar-link.active {
          background: linear-gradient(135deg, #C5A27D, #BFA37C);
          box-shadow: 0 4px 14px rgba(197,162,125,0.35);
        }

        .sidebar-link.active::before {
          content: '';
          position: absolute;
          left: -1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: #C5A27D;
          border-radius: 0 3px 3px 0;
        }

        .sidebar-icon-wrap {
          width: 34px; height: 34px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .sidebar-link:not(.active) .sidebar-icon-wrap {
          background: rgba(255,255,255,0.07);
        }

        .sidebar-link.active .sidebar-icon-wrap {
          background: rgba(10,35,66,0.2);
        }

        .sidebar-link svg {
          width: 17px; height: 17px;
        }

        .sidebar-link:not(.active) svg { color: rgba(255,255,255,0.75); }
        .sidebar-link.active svg { color: #0A2342; }

        .sidebar-text { flex: 1; }

        .sidebar-label {
          font-size: 0.865rem;
          font-weight: 500;
          line-height: 1.2;
        }

        .sidebar-link:not(.active) .sidebar-label { color: rgba(255,255,255,0.9); }
        .sidebar-link.active .sidebar-label { color: #0A2342; font-weight: 600; }

        .sidebar-desc {
          font-size: 0.72rem;
          margin-top: 1px;
        }

        .sidebar-link:not(.active) .sidebar-desc { color: rgba(197,162,125,0.6); }
        .sidebar-link.active .sidebar-desc { color: rgba(10,35,66,0.6); }

        /* ── MAIN CONTENT ── */
        .dash-main {
          flex: 1;
          padding: 2rem 2rem 3rem;
          min-width: 0;
        }

        /* ── PAGE TITLE ── */
        .dash-page-title {
          margin-bottom: 1.75rem;
        }

        .dash-page-title h1 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0A2342;
          margin: 0 0 4px;
          line-height: 1.15;
        }

        .dash-page-title p {
          color: #7A8A9A;
          font-size: 0.875rem;
          margin: 0;
        }

        /* ── STAT CARDS ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        @media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr; } }

        .stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 1.4rem 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.1);
        }

        .stat-card-accent {
          position: absolute;
          top: 0; right: 0;
          width: 100px; height: 100px;
          border-radius: 0 16px 0 100px;
          opacity: 0.06;
        }

        .stat-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .stat-icon-wrap {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
        }

        .stat-icon-wrap svg { width: 22px; height: 22px; }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #10B981;
          background: #ECFDF5;
          padding: 3px 8px;
          border-radius: 999px;
        }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem;
          font-weight: 700;
          color: #0A2342;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #7A8A9A;
          font-weight: 500;
        }

        /* ── CARDS ── */
        .dash-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
          margin-bottom: 1.75rem;
        }

        .dash-card-header {
          padding: 1.4rem 1.75rem 1rem;
          border-bottom: 1px solid #F1F3F5;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dash-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0A2342;
          margin: 0 0 2px;
        }

        .dash-card-desc {
          font-size: 0.8rem;
          color: #7A8A9A;
          margin: 0;
        }

        .dash-card-body {
          padding: 1.5rem 1.75rem;
        }

        /* ── WELCOME BANNER ── */
        .welcome-banner {
          background: linear-gradient(135deg, #0A2342 0%, #0d2d56 50%, #102f5c 100%);
          border-radius: 16px;
          padding: 2rem 2.5rem;
          margin-bottom: 1.75rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(10,35,66,0.25);
        }

        .welcome-banner::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(197,162,125,0.12);
        }

        .welcome-banner::after {
          content: '';
          position: absolute;
          bottom: -80px; right: 80px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(197,162,125,0.07);
        }

        .welcome-banner h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px;
        }

        .welcome-banner p {
          color: rgba(255,255,255,0.65);
          font-size: 0.875rem;
          margin: 0 0 1.25rem;
          max-width: 480px;
        }

        .welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(197,162,125,0.2);
          border: 1px solid rgba(197,162,125,0.4);
          color: #C5A27D;
          padding: 5px 14px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 500;
        }

        /* ── QUICK ACTIONS ── */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        @media (max-width: 900px) { .actions-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .actions-grid { grid-template-columns: 1fr; } }

        .action-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 1rem 1.25rem;
          background: #F8F9FB;
          border: 1px solid #EAECEF;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .action-card:hover {
          background: #0A2342;
          border-color: #0A2342;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(10,35,66,0.2);
        }

        .action-card:hover .action-label { color: #fff; }
        .action-card:hover .action-desc { color: rgba(255,255,255,0.55); }
        .action-card:hover .action-icon-wrap { background: rgba(197,162,125,0.2); }
        .action-card:hover .action-icon-wrap svg { color: #C5A27D; }
        .action-card:hover .action-arrow { color: rgba(255,255,255,0.4); }

        .action-icon-wrap {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          transition: all 0.2s;
        }

        .action-icon-wrap svg { width: 18px; height: 18px; color: #0A2342; transition: color 0.2s; }

        .action-text { flex: 1; min-width: 0; }

        .action-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0A2342;
          transition: color 0.2s;
          white-space: nowrap;
        }

        .action-desc {
          font-size: 0.75rem;
          color: #7A8A9A;
          margin-top: 1px;
          transition: color 0.2s;
        }

        .action-arrow {
          color: #CBD2D9;
          transition: color 0.2s;
        }

        .action-arrow svg { width: 14px; height: 14px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .dash-sidebar {
            position: fixed;
            top: 64px; left: 0;
            z-index: 40;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .dash-sidebar.open { transform: translateX(0); }
          .dash-main { padding: 1.25rem; }
          .stats-grid { gap: 0.85rem; }
        }
      `}</style>

      <div className="dash-root">
        {/* Header */}
        <header className="dash-header">
          <div className="dash-logo">
            <span className="dash-logo-dot" />
            Dental Ease
            <span style={{ color: "#C5A27D", marginLeft: 2 }}>Admin</span>
          </div>

          <div className="dash-header-right">
            {admin && (
              <span className="dash-welcome-pill">
                {admin.first_name} {admin.last_name}
              </span>
            )}
            <Link href="/" className="dash-back-link">
              ← Back to Website
            </Link>
            <button className="dash-logout-btn" onClick={handleLogout}>
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </header>

        <div className="dash-body">
          {/* Sidebar */}
          <aside className={`dash-sidebar${sidebarOpen ? " open" : ""}`}>
            <div className="sidebar-section-label">Main</div>

            {menuItems.slice(0, 1).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`sidebar-link${isActive ? " active" : ""}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="sidebar-icon-wrap">
                    <Icon />
                  </span>
                  <span className="sidebar-text">
                    <span className="sidebar-label">{item.label}</span>
                    <span className="sidebar-desc">{item.description}</span>
                  </span>
                </Link>
              );
            })}

            <div className="sidebar-section-label">Management</div>

            {menuItems.slice(1, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`sidebar-link${isActive ? " active" : ""}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="sidebar-icon-wrap">
                    <Icon />
                  </span>
                  <span className="sidebar-text">
                    <span className="sidebar-label">{item.label}</span>
                    <span className="sidebar-desc">{item.description}</span>
                  </span>
                </Link>
              );
            })}

            <div className="sidebar-section-label">Communication</div>

            {menuItems.slice(7).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`sidebar-link${isActive ? " active" : ""}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="sidebar-icon-wrap">
                    <Icon />
                  </span>
                  <span className="sidebar-text">
                    <span className="sidebar-label">{item.label}</span>
                    <span className="sidebar-desc">{item.description}</span>
                  </span>
                </Link>
              );
            })}
          </aside>

          {/* Main Content */}
          <main className="dash-main">
            {/* Page Title */}
            <div className="dash-page-title">
              <h1>Dashboard</h1>
              <p>Here's what's happening at your clinic today.</p>
            </div>

            {/* Welcome Banner */}
            <div className="welcome-banner">
              <h2>Good to see you{admin ? `, ${admin.first_name}` : ""}! 👋</h2>
              <p>
                Your clinic dashboard gives you a complete overview of patients,
                appointments, and staff. Use the sidebar to manage all aspects
                of your practice.
              </p>
              <span className="welcome-badge">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#C5A27D",
                    display: "inline-block",
                  }}
                />
                System online & up to date
              </span>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              {statCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div className="stat-card" key={i}>
                    <div
                      className={`stat-card-accent bg-gradient-to-br ${card.color}`}
                    />
                    <div className="stat-card-top">
                      <div className={`stat-icon-wrap ${card.bg}`}>
                        <Icon className={card.iconColor} />
                      </div>
                      <span className="stat-trend">
                        <TrendingUp size={11} />
                        {card.trend}
                      </span>
                    </div>
                    <div className="stat-value">
                      {loading ? "—" : card.value}
                    </div>
                    <div className="stat-label">{card.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="dash-card">
              <div className="dash-card-header">
                <div>
                  <p className="dash-card-title">Quick Actions</p>
                  <p className="dash-card-desc">
                    Jump to common administrative tasks
                  </p>
                </div>
              </div>
              <div className="dash-card-body">
                <div className="actions-grid">
                  {quickActions.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Link key={i} href={item.href} className="action-card">
                        <div className="action-icon-wrap">
                          <Icon />
                        </div>
                        <div className="action-text">
                          <div className="action-label">{item.label}</div>
                          <div className="action-desc">{item.desc}</div>
                        </div>
                        <span className="action-arrow">
                          <ChevronRight />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
