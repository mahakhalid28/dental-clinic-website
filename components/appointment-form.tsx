"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Shield,
  Users,
  Award,
  Phone,
} from "lucide-react";
import { AnimateOnScroll, fadeInUp, scaleIn } from "./motion";

interface Service {
  id: string;
  service_name: string;
  description: string;
  price: number;
  duration_minutes: number;
  image?: string;
}

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (response.ok) {
          const data: Service[] = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  if (submitted) {
    return (
      <section
        id="appointment"
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0A2342 0%, #0D2B4D 50%, #0A2342 100%)",
        }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center relative z-10">
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, #BFA37C 0%, #D4B896 100%)",
            }}
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
          <h2
            className="text-3xl font-bold tracking-tight md:text-4xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#FFFFFF",
            }}
          >
            Appointment Requested!
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Thank you for choosing Pearlshine Dental. Our team will reach out
            within 24 hours to confirm your appointment. We look forward to
            seeing you!
          </p>
          <button
            className="mt-8 px-8 py-3 rounded-full font-semibold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #BFA37C 0%, #D4B896 100%)",
              color: "#0A2342",
            }}
            onClick={() => setSubmitted(false)}
          >
            Book Another Appointment
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="appointment"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A2342 0%, #0D2B4D 50%, #0A2342 100%)",
      }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #BFA37C 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #BFA37C 0%, transparent 60%)",
        }}
      />
      {/* Gold accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #BFA37C 50%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Column - Benefits & Info */}
          <AnimateOnScroll variants={fadeInUp} className="lg:col-span-2">
            <div className="sticky top-8">
              {/* Badge */}
              <span
                className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{
                  background: "rgba(191, 163, 124, 0.15)",
                  color: "#BFA37C",
                  border: "1px solid rgba(191, 163, 124, 0.3)",
                }}
              >
                Book Your Visit
              </span>

              {/* Main Heading */}
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#FFFFFF",
                  lineHeight: "1.2",
                }}
              >
                Schedule Your
                <span style={{ color: "#BFA37C" }}> Perfect Smile</span>
              </h2>

              <p
                className="text-base mb-10 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Take the first step towards exceptional dental care. Our team is
                ready to provide you with a personalized experience.
              </p>

              {/* Trust Indicators */}
              <div className="space-y-5">
                {[
                  {
                    icon: Clock,
                    title: "Quick Response",
                    desc: "We respond within 2 hours",
                  },
                  {
                    icon: Shield,
                    title: "100% Confidential",
                    desc: "Your information is secure",
                  },
                  {
                    icon: Users,
                    title: "Expert Care",
                    desc: "3+ experienced dentists",
                  },
                  {
                    icon: Award,
                    title: "Award Winning",
                    desc: "Best dental clinic 2025",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 group"
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: "rgba(191, 163, 124, 0.15)" }}
                    >
                      <item.icon
                        className="w-5 h-5"
                        style={{ color: "#BFA37C" }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-0.5">
                        {item.title}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact */}
              <div
                className="mt-10 p-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p
                  className="text-sm mb-3"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Prefer to talk? Call us directly:
                </p>
                <a
                  href="tel:03088402625"
                  className="flex items-center gap-3 text-xl font-bold transition-colors hover:opacity-80"
                  style={{ color: "#BFA37C" }}
                >
                  <Phone className="w-5 h-5" />
                  0308-8402625
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Column - Form Card */}
          <AnimateOnScroll
            variants={scaleIn}
            delay={0.2}
            className="lg:col-span-3"
          >
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)",
                boxShadow:
                  "0 25px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(191, 163, 124, 0.2)",
              }}
            >
              {/* Form Header */}
              <div className="mb-8 text-center">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#0A2342",
                  }}
                >
                  Request an Appointment
                </h3>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  Fill out the form below and we'll get back to you shortly
                </p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const form = e.currentTarget as HTMLFormElement;
                  const fd = new FormData(form);
                  const obj: Record<string, any> = {};
                  fd.forEach((value, key) => {
                    if (obj[key]) {
                      if (Array.isArray(obj[key])) obj[key].push(value);
                      else obj[key] = [obj[key], value];
                    } else {
                      obj[key] = value;
                    }
                  });

                  try {
                    // Save appointment to database
                    const appointmentData = {
                      patient_id: obj.patient_id || null,
                      service_id: obj.service || null,
                      appointment_date: obj.date || null,
                      appointment_time: obj.time || null,
                      status: "scheduled",
                      notes: obj.message || null,
                    };

                    const response = await fetch("/api/appointments", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(appointmentData),
                    });

                    if (response.ok) {
                      console.log("Appointment submitted:", appointmentData);
                      setSubmitted(true);
                    } else {
                      console.error("Failed to submit appointment");
                    }
                  } catch (error) {
                    console.error("Error submitting appointment:", error);
                  }
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium"
                      style={{ color: "#0A2342" }}
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Jane"
                      required
                      className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium"
                      style={{ color: "#0A2342" }}
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium"
                      style={{ color: "#0A2342" }}
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                      className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium"
                      style={{ color: "#0A2342" }}
                    >
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      required
                      className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="service"
                      className="text-sm font-medium"
                      style={{ color: "#0A2342" }}
                    >
                      Service
                    </Label>
                    <Select required disabled={loadingServices}>
                      <SelectTrigger
                        id="service"
                        className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                      >
                        <SelectValue
                          placeholder={
                            loadingServices
                              ? "Loading services..."
                              : "Select a service"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.service_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="date"
                      className="text-sm font-medium"
                      style={{ color: "#0A2342" }}
                    >
                      Preferred Date
                    </Label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        required
                        className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                      />
                      <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="time"
                      className="text-sm font-medium"
                      style={{ color: "#0A2342" }}
                    >
                      Preferred Time
                    </Label>
                    <div className="relative">
                      <Select required>
                        <SelectTrigger
                          id="time"
                          className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                        >
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Clock className="pointer-events-none absolute right-10 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="insurance"
                      className="text-sm font-medium"
                      style={{ color: "#0A2342" }}
                    >
                      Insurance Provider
                    </Label>
                    <Input
                      id="insurance"
                      placeholder="e.g. Blue Cross"
                      className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium"
                      style={{ color: "#0A2342" }}
                    >
                      Additional Notes
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Any concerns or special requests..."
                      rows={4}
                      className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                    />
                  </div>

                  {/* Medical History Section */}
                  <div className="flex flex-col gap-4 sm:col-span-2 mt-4">
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "#0A2342" }}
                    >
                      Medical History (check all that apply)
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="history_diabetes"
                          value="yes"
                          className="h-4 w-4"
                        />
                        <span className="text-sm" style={{ color: "#555555" }}>
                          Diabetes
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="history_heart"
                          value="yes"
                          className="h-4 w-4"
                        />
                        <span className="text-sm" style={{ color: "#555555" }}>
                          Heart Disease
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="history_hypertension"
                          value="yes"
                          className="h-4 w-4"
                        />
                        <span className="text-sm" style={{ color: "#555555" }}>
                          Hypertension
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="history_bleeding"
                          value="yes"
                          className="h-4 w-4"
                        />
                        <span className="text-sm" style={{ color: "#555555" }}>
                          Bleeding Disorders
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="history_smoker"
                          value="yes"
                          className="h-4 w-4"
                        />
                        <span className="text-sm" style={{ color: "#555555" }}>
                          Smoker
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="history_pregnant"
                          value="yes"
                          className="h-4 w-4"
                        />
                        <span className="text-sm" style={{ color: "#555555" }}>
                          Pregnant
                        </span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor="allergies"
                          className="text-sm font-medium"
                          style={{ color: "#0A2342" }}
                        >
                          Allergies (if any)
                        </Label>
                        <Input
                          id="allergies"
                          name="allergies"
                          placeholder="e.g. Penicillin, Latex"
                          className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor="medications"
                          className="text-sm font-medium"
                          style={{ color: "#0A2342" }}
                        >
                          Current Medications
                        </Label>
                        <Input
                          id="medications"
                          name="medications"
                          placeholder="List current medications"
                          className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Submit Button */}
                <div className="mt-10">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-base font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background:
                        "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
                      color: "#FFFFFF",
                      boxShadow: "0 8px 30px -10px rgba(10, 35, 66, 0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 40px -10px rgba(10, 35, 66, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 30px -10px rgba(10, 35, 66, 0.4)";
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <CalendarDays
                        className="w-5 h-5"
                        style={{ color: "#BFA37C" }}
                      />
                      Request Appointment
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
                    </span>
                  </button>

                  {/* Trust note below button */}
                  <p
                    className="text-center mt-4 text-xs"
                    style={{ color: "#9CA3AF" }}
                  >
                    <Shield className="w-3 h-3 inline-block mr-1" />
                    Your information is 100% secure and will never be shared
                  </p>
                </div>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
