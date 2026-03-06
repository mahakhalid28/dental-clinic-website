"use client";

import { Award, Users, Clock, Smile, Shield, HeartPulse } from "lucide-react";
import {
  AnimateOnScroll,
  AnimatedCounter,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  scaleIn,
} from "./motion";

const stats = [
  {
    icon: Clock,
    value: 8,
    suffix: "+",
    label: "Years of Excellence",
    description: "Dedicated to dental care",
  },
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Happy Patients",
    description: "Smiles transformed",
  },
  {
    icon: Award,
    value: 3,
    suffix: "+",
    label: "Expert Dentists",
    description: "Board-certified specialists",
  },
  {
    icon: Smile,
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Patient satisfaction",
  },
];

const features = [
  {
    icon: Shield,
    title: "Safe & Sterile",
    description: "Hospital-grade sterilization protocols",
  },
  {
    icon: HeartPulse,
    title: "Painless Procedures",
    description: "Modern anesthesia techniques",
  },
  {
    icon: Clock,
    title: "Same-Day Appointments",
    description: "Emergency care available",
  },
];

export function Stats() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background with subtle gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0A2342 0%, #0D2B4D 50%, #0A2342 100%)",
        }}
      />

      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-10"
        style={{
          background: "radial-gradient(circle, #BFA37C 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-10"
        style={{
          background: "radial-gradient(circle, #BFA37C 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <AnimateOnScroll
          variants={fadeInUp}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.25em] mb-4"
            style={{ color: "#BFA37C" }}
          >
            WHY CHOOSE US
          </p>
          <h2
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-white mb-6"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            Excellence in Every Detail
          </h2>
          <div
            className="w-20 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: "#BFA37C" }}
          />
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255, 255, 255, 0.8)" }}
          >
            We combine cutting-edge technology with compassionate care to
            deliver exceptional dental experiences.
          </p>
        </AnimateOnScroll>

        {/* Stats Grid */}
        <StaggerContainer
          className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8 mb-16"
          staggerDelay={0.15}
        >
          {stats.map((stat, index) => (
            <StaggerItem key={index} variants={scaleIn}>
              <div
                className="group relative p-6 lg:p-8 rounded-2xl text-center transition-all duration-500 hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(191, 163, 124, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(191, 163, 124, 0.1)";
                  e.currentTarget.style.borderColor = "#BFA37C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor =
                    "rgba(191, 163, 124, 0.2)";
                }}
              >
                {/* Icon */}
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "rgba(191, 163, 124, 0.15)",
                  }}
                >
                  <stat.icon className="h-7 w-7" style={{ color: "#BFA37C" }} />
                </div>

                {/* Animated Number */}
                <div
                  className="text-4xl lg:text-5xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    color: "#FFFFFF",
                  }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>

                {/* Label */}
                <p
                  className="text-sm font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "#BFA37C" }}
                >
                  {stat.label}
                </p>

                {/* Description */}
                <p
                  className="text-xs"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  {stat.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Features Row */}
        <StaggerContainer
          className="grid gap-6 md:grid-cols-3"
          staggerDelay={0.2}
        >
          {features.map((feature, index) => (
            <StaggerItem key={index} variants={fadeInUp}>
              <div
                className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300 hover:translate-x-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(191, 163, 124, 0.1)",
                }}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: "rgba(191, 163, 124, 0.1)",
                  }}
                >
                  <feature.icon
                    className="h-6 w-6"
                    style={{ color: "#BFA37C" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-semibold text-white mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
