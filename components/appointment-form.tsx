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
  const [selectedTime, setSelectedTime] = useState("");
  // FIX 1: State must be INSIDE the function
  const [selectedService, setSelectedService] = useState("");

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
            within 24 hours to confirm your appointment.
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
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <AnimateOnScroll variants={fadeInUp} className="lg:col-span-2">
            <div className="sticky top-8">
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
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#FFFFFF",
                  lineHeight: "1.2",
                }}
              >
                Schedule Your{" "}
                <span style={{ color: "#BFA37C" }}> Perfect Smile</span>
              </h2>
              <p
                className="text-base mb-10 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Take the first step towards exceptional dental care.
              </p>
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
            </div>
          </AnimateOnScroll>

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
                  const payload = {
                    name: `${fd.get("firstName")} ${fd.get("lastName")}`.trim(),
                    email: fd.get("email"),
                    phone: fd.get("phone"),
                    service_id: fd.get("service"),
                    appointment_date: fd.get("date"),
                    appointment_time: selectedTime,
                    notes: fd.get("message"),
                    history_diabetes: fd.get("history_diabetes") === "yes",
                    history_heart: fd.get("history_heart") === "yes",
                    history_hypertension:
                      fd.get("history_hypertension") === "yes",
                    history_bleeding: fd.get("history_bleeding") === "yes",
                    history_smoker: fd.get("history_smoker") === "yes",
                    history_pregnant: fd.get("history_pregnant") === "yes",
                    allergies: fd.get("allergies") || "",
                    current_medications: fd.get("medications") || "",
                  };
                  try {
                    const res = await fetch("/api/appointments", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                    if (res.ok) setSubmitted(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Jane"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="service">Service</Label>
                    <Select required onValueChange={setSelectedService}>
                      <SelectTrigger id="service">
                        <SelectValue
                          placeholder={
                            loadingServices ? "Loading..." : "Select a service"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.service_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input
                      type="hidden"
                      name="service"
                      value={selectedService}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <div className="relative">
                      <Input id="date" name="date" type="date" required />
                      <CalendarDays className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select
                      required
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                    >
                      <SelectTrigger id="time">
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
                    <input type="hidden" name="time" value={selectedTime} />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="message">Additional Notes</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Any concerns..."
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-col gap-4 sm:col-span-2 mt-4">
                    <h3 className="text-sm font-semibold">Medical History</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "diabetes",
                        "heart",
                        "hypertension",
                        "bleeding",
                        "smoker",
                        "pregnant",
                      ].map((item) => (
                        <label key={item} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name={`history_${item}`}
                            value="yes"
                            className="h-4 w-4"
                          />
                          <span className="text-sm capitalize">
                            {item.replace("_", " ")}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-base font-bold uppercase tracking-wider bg-[#0A2342] text-white"
                  >
                    Request Appointment
                  </button>
                </div>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
