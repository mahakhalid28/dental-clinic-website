"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const footerNav = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Testimonials", href: "/#testimonials" }  ],
  Support: [
    { label: "Book Appointment", href: "#appointment" },
    { label: "Contact Us", href: "#contact" },
    { label: "Insurance Info", href: "#" },
    { label: "Patient Forms", href: "#" },
  ],
};

interface ContactDetail {
  id: number;
  type: string;
  line_1: string;
  line_2: string | null;
  link: string | null;
  link_text: string | null;
}

export function Footer() {
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>([]);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch("/api/contact");
        if (response.ok) {
          const data = await response.json();
          setContactDetails(data);
        }
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      }
    };

    fetchContactDetails();
  }, []);

  // Extract specific contact info from database
  const getContactInfo = (type: string) => {
    return contactDetails.find((c) => c.type === type);
  };

  const visitUs = getContactInfo("Visit Us");
  const callUs = getContactInfo("Call Us");
  const emailUs = getContactInfo("Email Us");

  return (
    <footer style={{ backgroundColor: "#0A2342" }}>
      <div className="mx-auto max-w-7xl px-6 py-20 text-lg">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="#home" className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#BFA37C" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="#0A2342"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C8 2 6 5 6 8c0 4 2 6 3 10h6c1-4 3-6 3-10 0-3-2-6-6-6Z" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              </div>
              <span className="text-3xl font-bold tracking-tight text-white">
                  Dental Ease
              </span>
            </Link>
              <div className="max-w-xs text-lg leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                <p className="font-semibold text-xl">Designed for comfort. Delivered with care.</p>
                <p className="mt-2 text-lg">Because your smile deserves the very best.</p>
              </div>

              {/* Contact Information from Database */}
              <div className="mt-6 space-y-3 text-sm">
                {callUs && (
                  <a
                    href={`tel:${callUs.line_1}`}
                    className="flex items-center gap-2 transition-colors hover:text-[#BFA37C]"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                    <span>{callUs?.line_1}</span>
                  </a>
                )}
                {emailUs && (
                  <a
                    href={`mailto:${emailUs?.line_1}`}
                    className="flex items-center gap-2 transition-colors hover:text-[#BFA37C] break-all"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>{emailUs?.line_1}</span>
                  </a>
                )}
                {visitUs && (
                  <a
                    href={visitUs?.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-[#BFA37C]"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                    <span className="text-xs">{visitUs?.line_1}</span>
                  </a>
                )}
              </div>
          </div>

          {Object.entries(footerNav).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <nav
                className="flex flex-col gap-3"
                aria-label={`${title} navigation`}
              >
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg transition-colors duration-200 hover:text-[#BFA37C]"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{ borderTop: "1px solid rgba(191, 163, 124, 0.3)" }}
        >
          <p className="text-lg" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            {`© ${new Date().getFullYear()} Dental Ease. All rights reserved.`}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-lg transition-colors duration-200 hover:text-[#BFA37C]"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-lg transition-colors duration-200 hover:text-[#BFA37C]"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
