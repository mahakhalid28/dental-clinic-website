"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Calendar } from "lucide-react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/all-services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Utility Bar */}
      <div className="w-full bg-[#0A2342]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2">
          <Link
            href="#appointment"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:text-[#BFA37C]"
          >
            <Calendar className="h-3.5 w-3.5" />
            Book Now
          </Link>
        </div>
      </div>

      {/* Main Nav Row - Logo & Phone */}
      <div className="w-full bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span
              className="text-2xl md:text-3xl font-semibold tracking-wide"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#0A2342",
                letterSpacing: "0.02em",
              }}
            >
              Dental Ease
            </span>
          </Link>

          {/* Phone Number - Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <Phone className="h-4 w-4 text-[#BFA37C]" />
            <Link
              href="tel:+923088402625"
              className="text-base font-medium transition-colors hover:text-[#BFA37C]"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                color: "#333333",
              }}
            >
              03088402625
            </Link>
            <Link
              href="/admin/login"
              className="ml-6 inline-flex items-center px-3 py-2 rounded-md text-sm font-semibold bg-[#0A2342] text-white hover:bg-[#BFA37C] transition-colors"
              aria-label="Admin login"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-[#0A2342]" />
            ) : (
              <Menu className="h-6 w-6 text-[#0A2342]" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Nav Row - Navigation Links */}
      <nav
        className="hidden w-full bg-[#0A2342] border-b border-[#BFA37C]/30 md:block"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-6">
          <ul className="flex items-center justify-center gap-8 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.875rem] font-medium text-white transition-colors duration-200 hover:text-[#BFA37C]"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-b border-[#E8E3D3] bg-white px-6 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.875rem] font-medium transition-colors duration-200 hover:text-[#BFA37C]"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: "#333333",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-4 border-t border-[#E8E3D3] pt-4">
            <Link
              href="tel:+923088402625"
              className="flex items-center gap-2 text-sm font-medium"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                color: "#333333",
              }}
            >
              <Phone className="h-4 w-4 text-[#BFA37C]" />
              03088402625
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-2 rounded-lg border border-[#E8E3D3] px-6 py-3 text-sm font-medium uppercase tracking-wider text-[#0A2342] transition-colors hover:bg-[#F6F6F6]"
              onClick={() => setMobileOpen(false)}
            >
              Admin Login
            </Link>
            <Link
              href="#appointment"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#0A2342] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#0A2342]/90"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              onClick={() => setMobileOpen(false)}
            >
              <Calendar className="h-4 w-4" />
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
