"use client";

import { useState, useEffect } from "react";
import { toast } from "./ui/use-toast";
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
import { CalendarDays, CheckCircle2, Phone } from "lucide-react";
import { AnimateOnScroll, fadeInUp, scaleIn } from "./motion";

interface Service {
  id: string;
  service_name: string;
}

interface Dentist {
  id: string;
  name: string;
}

export function AppointmentForm() {
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

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Controlled States for Selects
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDentist, setSelectedDentist] = useState("");

  // Get today's date in YYYY-MM-DD format for the calendar min attribute
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [servicesRes, dentistsRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/dentists"),
        ]);
        if (servicesRes.ok) setServices(await servicesRes.json());
        if (dentistsRes.ok) setDentists(await dentistsRes.json());
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return; // Prevent duplicate clicks

    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: `${fd.get("firstName")} ${fd.get("lastName")}`.trim(),
      email: fd.get("email"),
      phone: fd.get("phone"),
      city: fd.get("city") || "Lahore",
      blood_group: fd.get("blood_group"),
      gender: fd.get("gender"),
      service_id: selectedService,
      dentist_id: selectedDentist,
      appointment_date: fd.get("date"),
      appointment_time: selectedTime,
      notes: fd.get("message"),
      history_diabetes: fd.get("history_diabetes") === "yes",
      history_heart: fd.get("history_heart") === "yes",
      history_hypertension: fd.get("history_hypertension") === "yes",
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

      if (res.ok) {
        setSubmitted(true);
        toast({
          title: "Success",
          description: "Appointment requested successfully!",
        });
      } else {
        throw new Error("Failed to book");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 text-center bg-[#0A2342] text-white">
        <div className="mx-auto max-w-2xl px-6">
          <CheckCircle2 className="mx-auto h-16 w-16 text-[#BFA37C] mb-6" />
          <h2 className="text-3xl font-bold mb-4">Appointment Requested!</h2>
          <p className="opacity-80">
            We will contact you shortly to confirm your visit.
          </p>
          <Button
            className="mt-8 bg-[#BFA37C] text-[#0A2342]"
            onClick={() => setSubmitted(false)}
          >
            Book Another
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="appointment"
      className="py-24 bg-[#0A2342] relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12">
          <AnimateOnScroll
            variants={fadeInUp}
            className="lg:col-span-2 text-white"
          >
            <span className="text-[#BFA37C] font-bold uppercase tracking-widest text-sm">
              Book Your Visit
            </span>
            <h2
              className="text-4xl lg:text-5xl font-bold mt-4 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Schedule Your{" "}
              <span className="text-[#BFA37C]">Perfect Smile</span>
            </h2>
            <p className="opacity-70">
              Experience premium dental care tailored to your needs.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variants={scaleIn} className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="03xx-xxxxxxx"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Service</Label>
                    <Select
                      required
                      onValueChange={setSelectedService}
                      value={selectedService}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue
                          placeholder={
                            loadingInitial ? "Loading..." : "Select Service"
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
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Dentist</Label>
                    <Select
                      required
                      onValueChange={setSelectedDentist}
                      value={selectedDentist}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Dentist" />
                      </SelectTrigger>
                      <SelectContent>
                        {dentists.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        min={today}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Time</Label>
                    <Select
                      required
                      onValueChange={setSelectedTime}
                      value={selectedTime}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Notes</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your dental concern..."
                  />
                </div>

                <div className="pt-4">
                  <Label className="text-sm font-bold mb-3 block text-[#0A2342]">
                    Medical History
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl">
                    {[
                      "diabetes",
                      "heart",
                      "hypertension",
                      "bleeding",
                      "smoker",
                      "pregnant",
                    ].map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 cursor-pointer hover:text-[#BFA37C] transition-colors"
                      >
                        <input
                          type="checkbox"
                          name={`history_${item}`}
                          value="yes"
                          className="rounded border-gray-300 text-[#BFA37C] focus:ring-[#BFA37C]"
                        />
                        <span className="text-xs capitalize">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-[#0A2342] hover:bg-[#1a3a5f] text-white font-bold rounded-xl transition-all"
                >
                  {loading ? "Booking in progress..." : "Confirm Appointment"}
                </Button>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
