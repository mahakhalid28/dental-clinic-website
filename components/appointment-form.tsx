"use client";

import { useState } from "react";
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
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";

const services = [
  "General Checkup",
  "Teeth Cleaning",
  "Teeth Whitening",
  "Dental Implants",
  "Cosmetic Consultation",
  "Orthodontics",
  "Pediatric Dentistry",
  "Emergency Visit",
];

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

  if (submitted) {
    return (
      <section id="appointment" className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            Appointment Requested!
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Thank you for choosing Pearlshine Dental. Our team will reach out
            within 24 hours to confirm your appointment. We look forward to
            seeing you!
          </p>
          <Button className="mt-8" onClick={() => setSubmitted(false)}>
            Book Another Appointment
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p
            className="text-xl font-extrabold uppercase tracking-[0.25em] leading-relaxed"
            style={{ color: "#BFA37C" }}
          >
            BOOK AN APPOINTMENT
          </p>
          <h2
            className="mt-6 font-serif text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "#0A2342",
            }}
          >
            Ready to start planning? Let's connect.
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mx-auto max-w-3xl"
        >
          <div className="grid gap-6 sm:grid-cols-2">
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
              <Select required>
                <SelectTrigger
                  id="service"
                  className="bg-white border border-gray-200 focus:border-[#BFA37C] focus:ring-[#BFA37C] transition-colors"
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
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
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="w-full max-w-md rounded-md px-12 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:text-[#BFA37C]"
              style={{
                backgroundColor: "#0A2342",
                color: "#FFFFFF",
              }}
            >
              Request Appointment
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
