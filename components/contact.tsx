"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  scaleIn,
} from "./motion";

const details = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Nishat Colony, DHA phase 1", "Lahore, 54810"],
    link: "https://maps.app.goo.gl/L6x88ocRUk57H3iE8",
    linkText: "Get Directions",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["03088402625"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["Ahmedqureshi999@gmail.com"],
  },
  {
    icon: Clock,
    title: "Hours",
    lines: [
      "Mon-Fri: 4:00 AM - 10:00 PM",
      "Sat: 10:00 AM - 4:00 PM",
      "Sun: Closed",
    ],
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#E8E3D3" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <AnimateOnScroll
          variants={fadeInUp}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#BFA37C" }}
          >
            CONTACT US
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "#0A2342",
            }}
          >
            Get in touch with us
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "#5A5A5A" }}
          >
            Have questions or want to learn more? We are always happy to help.
          </p>
        </AnimateOnScroll>

        {/* Contact Info Grid */}
        <StaggerContainer
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.12}
        >
          {details.map((d) => (
            <StaggerItem key={d.title} variants={scaleIn} className="h-full">
              <div className="group h-full flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm border border-transparent transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-[#BFA37C]">
                {/* Gold Icon */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 mb-4"
                  style={{ backgroundColor: "rgba(191, 163, 124, 0.15)" }}
                >
                  <d.icon
                    className="h-6 w-6 transition-colors duration-300"
                    style={{ color: "#BFA37C" }}
                  />
                </div>

                {/* Navy Bold Label */}
                <h3
                  className="text-sm font-extrabold uppercase tracking-widest mb-4"
                  style={{ color: "#0A2342" }}
                >
                  {d.title}
                </h3>

                {/* Muted Charcoal Details - flex-1 to fill remaining space */}
                <div className="flex flex-col gap-1 flex-1 justify-center">
                  {d.lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm"
                      style={{ color: "#555555" }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Link at bottom (if exists) */}
                {d.link && (
                  <a
                    href={d.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm font-semibold transition-all duration-200 hover:underline"
                    style={{ color: "#0A2342" }}
                  >
                    {d.linkText} →
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
