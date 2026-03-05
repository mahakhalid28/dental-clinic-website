"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[90vh] overflow-hidden">
      {/* Full-width Background Image with subtle zoom animation */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
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
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
          {/* Floating Content Box with Marble Texture */}
          <motion.div
            className="lg:col-span-6 xl:col-span-5 relative z-20 px-8 py-12 md:px-12 md:py-16 lg:-mr-20 overflow-hidden"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
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
              <motion.div
                className="absolute -top-12 -left-8 md:-top-16 md:-left-12 w-16 h-16"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{
                  borderTop: "2px solid #BFA37C",
                  borderLeft: "2px solid #BFA37C",
                }}
              />
              <motion.div
                className="absolute -bottom-12 -right-8 md:-bottom-16 md:-right-12 w-16 h-16"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                style={{
                  borderBottom: "2px solid #BFA37C",
                  borderRight: "2px solid #BFA37C",
                }}
              />

              {/* Small Heading */}
              <motion.p
                className="text-xs font-semibold uppercase tracking-[0.25em] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  color: "#BFA37C",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Welcome to a New Era in Dentistry
              </motion.p>

              {/* Main Title */}
              <motion.h1
                className="text-3xl font-semibold leading-tight mb-6 md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                  lineHeight: "1.15",
                }}
              >
                A Modern Approach to Dentistry
              </motion.h1>

              {/* Gold Line Separator - 2px thick */}
              <motion.div
                className="w-20 mb-8"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{
                  backgroundColor: "#BFA37C",
                  height: "2px",
                }}
              />

              {/* Description */}
              <motion.p
                className="text-base leading-relaxed mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                For over 8 years, we have been dedicated to excellence and
                innovation in dental care. Our commitment to providing
                exceptional, personalized treatment has made us a trusted name
                in the community.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {/* Primary CTA - Book Appointment */}
                <Link
                  href="#appointment"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-medium uppercase tracking-wider transition-all duration-300"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    backgroundColor: "#BFA37C",
                    color: "#0A2342",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#D4B896";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#BFA37C";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </Link>

                {/* Secondary CTA - Call Now */}
                <Link
                  href="tel:+923001234567"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-[#BFA37C] hover:text-[#0A2342]"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    border: "2px solid #BFA37C",
                    color: "#FFFFFF",
                    backgroundColor: "transparent",
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Empty space for image visibility */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />
        </div>
      </div>
    </section>
  );
}
