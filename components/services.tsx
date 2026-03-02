"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "General Dentistry",
    image: "/images/service-general.jpg",
  },
  {
    title: "Cosmetic Dentistry",
    image: "/images/service-cosmetic.jpg",
  },
  {
    title: "Dental Implants",
    image: "/images/service-implants.jpg",
  },
  {
    title: "Orthodontics",
    image: "/images/service-orthodontics.jpg",
  },
  {
    title: "Teeth Whitening",
    image: "/images/service-whitening.jpg",
  },
  {
    title: "Pediatric Care",
    image: "/images/service-pediatric.jpg",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] mb-4"
            style={{
              color: "#BFA37C",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            What We Offer
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight mb-6 md:text-4xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#0A2342",
              letterSpacing: "0.02em",
            }}
          >
            Comprehensive Dental Services
          </h2>

          {/* All Services Button */}
          <Link
            href="#all-services"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-[#BFA37C]"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              backgroundColor: "#0A2342",
              color: "#FFFFFF",
            }}
          >
            All Services
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative h-80 overflow-hidden cursor-pointer transition-all duration-300 hover:border-2 hover:border-[#BFA37C]"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient Overlay - darker at bottom */}
              <div
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(10, 35, 66, 0.4) 0%, rgba(10, 35, 66, 0.6) 50%, rgba(10, 35, 66, 0.85) 100%)",
                }}
              />

              {/* Service Title - Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3
                  className="text-center uppercase tracking-[0.2em] px-4"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#FFFFFF",
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    letterSpacing: "0.15em",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {service.title}
                </h3>
              </div>

              {/* Gold border accent on hover (appears as inner glow) */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 2px #BFA37C",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
