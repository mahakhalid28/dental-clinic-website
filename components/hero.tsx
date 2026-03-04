"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[90vh] overflow-hidden">
      {/* Full-width Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-dental.jpg"
          alt="Modern dental surgery room with state-of-the-art equipment"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectPosition: "center" }}
        />
        {/* Dark overlay for contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10, 35, 66, 0.85) 0%, rgba(10, 35, 66, 0.4) 50%, rgba(10, 35, 66, 0.2) 100%)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
          {/* Floating Content Box with Marble Texture */}
          <div
            className="lg:col-span-6 xl:col-span-5 relative z-20 px-8 py-12 md:px-12 md:py-16 lg:-mr-20 overflow-hidden"
            style={{
              boxShadow:
                "0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(191, 163, 124, 0.15)",
            }}
          >
            {/* Marble Background Image */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: "url('/images/marble-texture.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Dark Navy Overlay for Readability */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundColor: "rgba(10, 35, 66, 0.75)",
              }}
            />

            {/* Content (relative to appear above overlays) */}
            <div className="relative z-10">
              {/* Decorative gold corner accent */}
              <div
                className="absolute -top-12 -left-8 md:-top-16 md:-left-12 w-16 h-16"
                style={{
                  borderTop: "2px solid #BFA37C",
                  borderLeft: "2px solid #BFA37C",
                }}
              />
              <div
                className="absolute -bottom-12 -right-8 md:-bottom-16 md:-right-12 w-16 h-16"
                style={{
                  borderBottom: "2px solid #BFA37C",
                  borderRight: "2px solid #BFA37C",
                }}
              />

              {/* Small Heading */}
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em] mb-6"
                style={{
                  color: "#BFA37C",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Welcome to a New Era in Dentistry
              </p>

              {/* Main Title */}
              <h1
                className="text-3xl font-semibold leading-tight mb-6 md:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                  lineHeight: "1.15",
                }}
              >
                A Modern Approach to Dentistry
              </h1>

              {/* Gold Line Separator - 2px thick */}
              <div
                className="w-20 mb-8"
                style={{
                  backgroundColor: "#BFA37C",
                  height: "2px",
                }}
              />

              {/* Description */}
              <p
                className="text-base leading-relaxed mb-10"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                For over 8 years, we have been dedicated to excellence and
                innovation in dental care. Our commitment to providing
                exceptional, personalized treatment has made us a trusted name
                in the community.
              </p>

              {/* CTA Button */}
              <Link
                href="#about"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-[#BFA37C] hover:text-[#0A2342]"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  border: "2px solid #BFA37C",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
              >
                About Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right side - Empty space for image visibility */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />
        </div>
      </div>
    </section>
  );
}
