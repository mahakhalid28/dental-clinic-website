"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  scaleIn,
} from "./motion";

interface Service {
  id: string;
  service_name: string;
  description: string;
  price: number;
  duration_minutes: number;
  image?: string; // Optional image field from database
}

interface FeaturedTreatment {
  name: string;
  price: string;
  description: string;
  image: string;
  icon: string;
  category: string;
}

// Function to map service names to images
const getServiceImage = (serviceName: string): string => {
  const name = serviceName.toLowerCase();
  
  if (name.includes('filling') || name.includes('restoration')) return '/images/filling.png';
  if (name.includes('extraction') || name.includes('removal')) return '/images/extraction.png';
  if (name.includes('cleaning') || name.includes('scaling')) return '/images/scaling.png';
  if (name.includes('whitening') || name.includes('bleaching')) return '/images/whitening.png';
  if (name.includes('crown') || name.includes('cap')) return '/images/crown.png';
  if (name.includes('bridge') || name.includes('bridges')) return '/images/bridges.png';
  if (name.includes('veneer') || name.includes('veneers')) return '/images/veneer.png';
  if (name.includes('root canal') || name.includes('endodontic')) return '/images/opd.png';
  if (name.includes('implant') || name.includes('implants')) return '/images/opd.png';
  if (name.includes('orthodontic') || name.includes('braces')) return '/images/opd.png';
  if (name.includes('pediatric') || name.includes('children')) return '/images/opd.png';
  if (name.includes('cosmetic') || name.includes('aesthetic')) return '/images/opd.png';
  if (name.includes('polishing')) return '/images/polishing.png';
  if (name.includes('planing') || name.includes('root planing')) return '/images/planing.png';
  if (name.includes('depigmentation')) return '/images/depigmentation.png';
  
  // Default image
  return '/images/opd.png';
};

export function Services() {
  const [featuredServices, setFeaturedServices] = useState<FeaturedTreatment[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (response.ok) {
          const data: Service[] = await response.json();

          // Map database services to featured treatments (first 3)
          const featured = data.slice(0, 3).map((service) => ({
            name: service.service_name,
            price: service.price?.toString() || "Contact",
            description: service.description || "",
            image: service.image || getServiceImage(service.service_name), // Use database image or map from folder
            icon: "🦷",
            category: "Dental Care",
          }));

          setFeaturedServices(featured);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FDFCFA 0%, #F8F6F3 50%, #F5F3EF 100%)",
      }}
    >
      {/* Subtle decorative elements for depth */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(191, 163, 124, 0.2) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <AnimateOnScroll
          variants={fadeInUp}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span
            className="inline-block text-sm font-medium uppercase tracking-[0.2em] mb-4"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              color: "#BFA37C",
            }}
          >
            Our Services
          </span>
          <h2
            className="text-4xl font-semibold mb-5 md:text-5xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#0A2342",
              lineHeight: "1.2",
            }}
          >
            Premium Dental Care
          </h2>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              color: "#6B7280",
              lineHeight: "1.8",
            }}
          >
            Experience exceptional dental care with our comprehensive range of
            treatments, designed for your comfort and well-being.
          </p>
        </AnimateOnScroll>

        {/* Premium Service Cards Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
          staggerDelay={0.15}
        >
          {loading ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Loading services...
            </div>
          ) : featuredServices.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No services available
            </div>
          ) : (
            featuredServices.map((treatment) => (
              <StaggerItem key={treatment.name} variants={scaleIn}>
                <div
                  className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                  style={{
                    background:
                      "linear-gradient(180deg, #FAF6F1 0%, #F5EFE8 100%)",
                    borderRadius: "24px",
                    boxShadow:
                      "0 0 0 1px rgba(191, 163, 124, 0.15), 0 8px 40px -8px rgba(10, 35, 66, 0.15), 0 0 60px -10px rgba(10, 35, 66, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(191, 163, 124, 0.3), 0 20px 60px -10px rgba(10, 35, 66, 0.22), 0 0 80px -5px rgba(10, 35, 66, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(191, 163, 124, 0.15), 0 8px 40px -8px rgba(10, 35, 66, 0.15), 0 0 60px -10px rgba(10, 35, 66, 0.1)";
                  }}
                >
                  {/* Image Container at Top */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      borderRadius: "24px 24px 0 0",
                      backgroundColor: "#FFFDF9",
                      borderBottom: "2px solid rgba(191, 163, 124, 0.2)",
                    }}
                  >
                    <div className="aspect-[4/3] w-full flex items-center justify-center p-6">
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                        style={{
                          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.08))",
                        }}
                      />
                    </div>
                    {/* Gold accent line at bottom of image */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #BFA37C, transparent)",
                        borderRadius: "2px",
                      }}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-7 lg:p-8">
                    {/* Category Tag - Gold accent */}
                    <span
                      className="inline-block mb-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(191, 163, 124, 0.15) 0%, rgba(191, 163, 124, 0.08) 100%)",
                        color: "#BFA37C",
                        border: "1px solid rgba(191, 163, 124, 0.25)",
                      }}
                    >
                      {treatment.category}
                    </span>

                    {/* Title - Elegant Serif in Navy */}
                    <h3
                      className="text-2xl font-bold mb-4 transition-colors duration-300"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: "#0A2342",
                        lineHeight: "1.25",
                      }}
                    >
                      {treatment.name}
                    </h3>

                    {/* Description - Clean Sans-serif */}
                    <p
                      className="text-sm leading-relaxed mb-8"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        color: "#4A5568",
                        lineHeight: "1.75",
                      }}
                    >
                      {treatment.description}
                    </p>

                    {/* Price & CTA Row */}
                    <div
                      className="flex items-end justify-between pt-5"
                      style={{ borderTop: "1px solid rgba(191, 163, 124, 0.2)" }}
                    >
                      {/* Starting From Price - Bottom Left */}
                      <div>
                        <span
                          className="block text-[10px] uppercase tracking-[0.15em] font-semibold mb-1"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            color: "#BFA37C",
                          }}
                        >
                          Starting From
                        </span>
                        <p
                          className="text-xl font-bold"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: "#0A2342",
                          }}
                        >
                          PKR {treatment.price}
                        </p>
                      </div>

                      {/* Navy Learn More Button with Gold Arrow - Bottom Right */}
                      <button
                        className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 group-hover:shadow-lg"
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          background:
                            "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
                          color: "#FFFDF9",
                          boxShadow: "0 4px 12px rgba(10, 35, 66, 0.2)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, #0D2B4D 0%, #0A2342 100%)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 6px 20px rgba(10, 35, 66, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(10, 35, 66, 0.2)";
                        }}
                      >
                        <span>Learn More</span>
                        {/* Gold Arrow Icon */}
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          style={{ color: "#BFA37C" }}
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))
          )}
        </StaggerContainer>

        {/* View All Services Button */}
        <AnimateOnScroll variants={fadeInUp} delay={0.3}>
          <div className="flex justify-center">
            <Link
              href="/all-services"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                backgroundColor: "#0A2342",
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(10, 35, 66, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#BFA37C";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(191, 163, 124, 0.35)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0A2342";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(10, 35, 66, 0.25)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View Full Services
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

export function AllServices() {
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (response.ok) {
          const data: Service[] = await response.json();
          setAllServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch all services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllServices();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative py-28 lg:py-36 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0A2342 0%, #0D2B4D 50%, #0A2342 100%)",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #BFA37C 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-8 blur-3xl"
          style={{
            background: "radial-gradient(circle, #FFFFFF 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, #BFA37C, transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <AnimateOnScroll variants={fadeInUp}>
            <span
              className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-8"
              style={{
                background: "rgba(191, 163, 124, 0.15)",
                color: "#BFA37C",
                border: "1px solid rgba(191, 163, 124, 0.3)",
              }}
            >
              Premium Dental Care
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll variants={fadeInUp} delay={0.1}>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#FFFFFF",
                lineHeight: "1.15",
              }}
            >
              Our Complete Range of
              <span className="block" style={{ color: "#BFA37C" }}>
                Dental Services
              </span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll variants={fadeInUp} delay={0.2}>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              From routine check-ups to advanced cosmetic procedures, we offer
              comprehensive dental care using state-of-the-art technology and
              techniques.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variants={scaleIn} delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/#appointment"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #BFA37C 0%, #D4B896 100%)",
                  color: "#0A2342",
                  boxShadow: "0 8px 30px -5px rgba(191, 163, 124, 0.4)",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book Appointment
              </Link>
              <a
                href="tel:03088402625"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                style={{
                  background: "transparent",
                  color: "#FFFFFF",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: "#BFA37C" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call: 0308-8402625
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services Content */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #FDFCFA 0%, #F8F6F3 50%, #F5F3EF 100%)",
        }}
      >
        {/* Subtle decorative elements */}
        <div
          className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, #BFA37C 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-40 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #0A2342 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading services...
            </div>
          ) : allServices.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No services available
            </div>
          ) : (
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.08}
            >
              {allServices.map((service) => (
                <StaggerItem key={service.id} variants={scaleIn}>
                  <div
                    className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
                    style={{
                      background:
                        "linear-gradient(180deg, #FAF6F1 0%, #F5EFE8 100%)",
                      borderRadius: "24px",
                      boxShadow:
                        "0 0 0 1px rgba(191, 163, 124, 0.15), 0 8px 40px -8px rgba(10, 35, 66, 0.12), 0 0 60px -10px rgba(10, 35, 66, 0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 0 1px rgba(191, 163, 124, 0.4), 0 20px 60px -10px rgba(10, 35, 66, 0.2), 0 0 80px -5px rgba(191, 163, 124, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 0 1px rgba(191, 163, 124, 0.15), 0 8px 40px -8px rgba(10, 35, 66, 0.12), 0 0 60px -10px rgba(10, 35, 66, 0.08)";
                    }}
                  >
                    {/* Image Container */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        borderRadius: "24px 24px 0 0",
                        backgroundColor: "#FFFDF9",
                        borderBottom:
                          "2px solid rgba(191, 163, 124, 0.2)",
                      }}
                    >
                      <div className="aspect-[4/3] w-full flex items-center justify-center p-6">
                        <img
                          src={service.image || getServiceImage(service.service_name)}
                          alt={service.service_name}
                          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                          style={{
                            filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.08))",
                          }}
                        />
                      </div>
                      {/* Price Badge */}
                      <div
                        className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
                          color: "#BFA37C",
                          boxShadow: "0 4px 15px rgba(10, 35, 66, 0.3)",
                        }}
                      >
                        PKR {service.price || "Contact"}
                      </div>
                      {/* Gold accent line */}
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, #BFA37C, transparent)",
                          borderRadius: "2px",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-7 flex-1 flex flex-col">
                      <h3
                        className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[#BFA37C]"
                        style={{
                          fontFamily:
                            "'Playfair Display', Georgia, serif",
                          color: "#0A2342",
                        }}
                      >
                        {service.service_name}
                      </h3>
                      <p
                        className="text-sm leading-relaxed flex-1 mb-4"
                        style={{ color: "#5A6573", lineHeight: "1.75" }}
                      >
                        {service.description}
                      </p>
                      <p
                        className="text-xs text-[#BFA37C] mb-6"
                      >
                        Duration: ~{service.duration_minutes} minutes
                      </p>

                      {/* Book Now Button */}
                      <Link
                        href="/#appointment"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
                          color: "#FFFFFF",
                          boxShadow:
                            "0 4px 15px -3px rgba(10, 35, 66, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px -5px rgba(10, 35, 66, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 15px -3px rgba(10, 35, 66, 0.3)";
                        }}
                      >
                        <span>Book This Treatment</span>
                        <svg
                          className="w-4 h-4"
                          style={{ color: "#BFA37C" }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* CTA Section at Bottom */}
          <AnimateOnScroll variants={fadeInUp} delay={0.2}>
            <div
              className="mt-24 p-10 md:p-14 rounded-3xl text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
                boxShadow: "0 25px 80px -20px rgba(10, 35, 66, 0.4)",
              }}
            >
              {/* Decorative */}
              <div
                className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, #BFA37C 0%, transparent 60%)",
                }}
              />

              <h3
                className="text-2xl md:text-3xl font-bold mb-4 relative z-10"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#FFFFFF",
                }}
              >
                Ready to Transform Your Smile?
              </h3>
              <p
                className="text-base mb-8 max-w-xl mx-auto relative z-10"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Schedule a consultation with our expert dentists and take the
                first step towards your perfect smile.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Link
                  href="/#appointment"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #BFA37C 0%, #D4B896 100%)",
                    color: "#0A2342",
                  }}
                >
                  Book Appointment
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                  style={{
                    background: "transparent",
                    color: "#FFFFFF",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
