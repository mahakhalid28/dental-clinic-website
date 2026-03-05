"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  scaleIn,
} from "./motion";

const testimonials = [
  {
    name: "Maria Gonzalez",
    initials: "M.G.",
    rating: 5,
    text: "I used to dread going to the dentist until I found Pearlshine. Dr. Chen and her team are incredibly gentle, thorough, and always make me feel at ease. My whole family goes here now.",
    source: "Google",
  },
  {
    name: "James O'Brien",
    initials: "J.O.",
    rating: 5,
    text: "The implant procedure was seamless from consultation to final result. I can eat, smile, and laugh with complete confidence again. Truly life-changing work.",
    source: "Yelp",
  },
  {
    name: "Aisha Patel",
    initials: "A.P.",
    rating: 5,
    text: "The office is beautiful, the staff is warm, and the Invisalign results speak for themselves. I recommend Pearlshine to everyone I know. Five stars is not enough.",
    source: "Google",
  },
  {
    name: "Robert Chen",
    initials: "R.C.",
    rating: 5,
    text: "After years of avoiding dentists, I finally found a practice that puts patient comfort first. The sedation dentistry option changed everything for me. Highly recommended!",
    source: "Yahoo",
  },
  {
    name: "Sarah Mitchell",
    initials: "S.M.",
    rating: 5,
    text: "My teeth whitening results exceeded all expectations. The team took time to explain every step and ensured I was comfortable throughout. A truly premium experience.",
    source: "Google",
  },
  {
    name: "David Thompson",
    initials: "D.T.",
    rating: 5,
    text: "From the moment you walk in, you know this isn't your average dental office. The attention to detail, the personalized care, and the stunning results speak volumes.",
    source: "Yelp",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20 lg:py-28">
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
            PATIENT TESTIMONIALS
          </p>
          <h2
            className="mt-4 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Hear from our patients
          </h2>
        </AnimateOnScroll>

        {/* Testimonials Grid */}
        <StaggerContainer
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.12}
        >
          {testimonials.map((t, index) => (
            <StaggerItem key={index} variants={scaleIn}>
              <div
                className="group relative flex flex-col rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                style={{
                  backgroundColor: "rgba(232, 227, 211, 0.3)",
                  border: "1px solid #E8E3D3",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#BFA37C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E8E3D3";
                }}
              >
                {/* Gold Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{ fill: "#BFA37C", color: "#BFA37C" }}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p
                  className="flex-1 text-base leading-7"
                  style={{
                    fontStyle: "italic",
                    color: "#555555",
                    lineHeight: "1.8",
                  }}
                >
                  "{t.text}"
                </p>

                {/* Author & Source */}
                <div
                  className="mt-6 flex items-center justify-between border-t pt-4"
                  style={{ borderColor: "#E8E3D3" }}
                >
                  {/* Author Initials */}
                  <p
                    className="text-center font-bold"
                    style={{ color: "#333333" }}
                  >
                    {t.initials}
                  </p>

                  {/* Source Icon */}
                  <span
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: "#999999" }}
                  >
                    {t.source}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Footer CTA */}
        <AnimateOnScroll variants={fadeInUp} delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Button
              size="lg"
              className="rounded-md px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "#0A2342",
                color: "#FFFFFF",
              }}
            >
              All Reviews
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
