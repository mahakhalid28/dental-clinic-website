"use client";

import Link from "next/link";
import { Check, Phone, HelpCircle, Sparkles } from "lucide-react";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
} from "./motion";

// Pricing data organized by category
const pricingCategories = [
  {
    title: "General Dentistry",
    icon: "🦷",
    description: "Essential dental care for a healthy smile",
    treatments: [
      { name: "OPD Consultation", price: "800", note: "Per visit" },
      { name: "Scaling", price: "12,000", note: "Full mouth" },
      { name: "Filling", price: "5,000", note: "Per tooth" },
      { name: "Polishing", price: "3,000", note: "Full mouth" },
      { name: "Root Planing", price: "2,000", note: "Per quadrant" },
      { name: "Simple Extraction", price: "4,000", note: "Per tooth" },
      { name: "Surgical Extraction", price: "15,000", note: "Per tooth" },
    ],
  },
  {
    title: "Cosmetic Dentistry",
    icon: "✨",
    description: "Transform your smile with our aesthetic treatments",
    treatments: [
      { name: "Teeth Whitening", price: "30,000", note: "Full treatment" },
      { name: "Gum Depigmentation", price: "10,000", note: "Full mouth" },
      { name: "Crown & Bridges", price: "8,000", note: "Per unit" },
      { name: "Veneering", price: "Custom", note: "Consultation required" },
      { name: "Crown Lengthening", price: "4,000", note: "Per tooth" },
    ],
  },
  {
    title: "Specialized Treatments",
    icon: "⭐",
    description: "Advanced procedures for complex dental needs",
    treatments: [
      { name: "Dental Implants", price: "60,000", note: "Per implant" },
      {
        name: "Braces (Orthodontics)",
        price: "100,000",
        note: "Full treatment",
      },
      { name: "Professional Whitening", price: "30,000", note: "In-office" },
      { name: "Children's Dental Care", price: "Varies", note: "Age-based" },
    ],
  },
];

const faqs = [
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible payment plans for major treatments. Discuss options with our front desk during your consultation.",
  },
  {
    question: "Are prices inclusive of all costs?",
    answer:
      "Prices shown are base prices. Complex cases may require additional procedures. We provide detailed cost breakdowns before treatment.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We work with most major insurance providers. Please bring your insurance details for verification during your visit.",
  },
  {
    question: "Is consultation fee adjustable?",
    answer:
      "The consultation fee of PKR 800 is often adjusted against treatment costs if you proceed with recommended treatment.",
  },
];

export function PricingPage() {
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
              Transparent Pricing
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
              Quality Dental Care,
              <span className="block" style={{ color: "#BFA37C" }}>
                Affordable Prices
              </span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll variants={fadeInUp} delay={0.2}>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              We believe everyone deserves a beautiful, healthy smile. View our
              transparent pricing and find the right treatment for your needs.
            </p>
          </AnimateOnScroll>

          {/* Quick CTA */}
          <AnimateOnScroll variants={scaleIn} delay={0.3}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
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
                Book Free Consultation
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
                <Phone className="w-5 h-5" style={{ color: "#BFA37C" }} />
                Get Quote
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Pricing Tables */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #FDFCFA 0%, #F8F6F3 50%, #F5F3EF 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <AnimateOnScroll variants={fadeInUp} className="text-center mb-16">
            <span
              className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#BFA37C" }}
            >
              Our Prices
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#0A2342",
              }}
            >
              Treatment Price List
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: "#5A6573" }}
            >
              All prices are in PKR. Prices may vary based on complexity. Final
              costs will be confirmed after consultation.
            </p>
          </AnimateOnScroll>

          {/* Pricing Cards */}
          <div className="space-y-10">
            {pricingCategories.map((category, index) => (
              <AnimateOnScroll
                key={category.title}
                variants={fadeInUp}
                delay={index * 0.1}
              >
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: "#FFFFFF",
                    boxShadow:
                      "0 0 0 1px rgba(191, 163, 124, 0.1), 0 10px 50px -15px rgba(10, 35, 66, 0.15)",
                  }}
                >
                  {/* Category Header */}
                  <div
                    className="p-8 lg:p-10"
                    style={{
                      background:
                        "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                        style={{ background: "rgba(191, 163, 124, 0.2)" }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <h3
                          className="text-2xl md:text-3xl font-bold"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: "#FFFFFF",
                          }}
                        >
                          {category.title}
                        </h3>
                        <p
                          className="text-sm mt-1"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Table */}
                  <div
                    className="divide-y"
                    style={{ borderColor: "rgba(191, 163, 124, 0.15)" }}
                  >
                    {category.treatments.map((treatment, tIndex) => (
                      <div
                        key={treatment.name}
                        className="flex items-center justify-between p-6 lg:px-10 transition-colors duration-300 hover:bg-[#FAF6F1]"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#BFA37C" }}
                          />
                          <div>
                            <h4
                              className="font-semibold"
                              style={{ color: "#0A2342" }}
                            >
                              {treatment.name}
                            </h4>
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: "#9CA3AF" }}
                            >
                              {treatment.note}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-xl font-bold"
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              color:
                                treatment.price === "Custom" ||
                                treatment.price === "Varies"
                                  ? "#BFA37C"
                                  : "#0A2342",
                            }}
                          >
                            {treatment.price === "Custom" ||
                            treatment.price === "Varies"
                              ? treatment.price
                              : `PKR ${treatment.price}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Book Button */}
                  <div
                    className="p-6 lg:px-10 flex justify-end"
                    style={{
                      background: "#FAF6F1",
                      borderTop: "1px solid rgba(191, 163, 124, 0.15)",
                    }}
                  >
                    <Link
                      href="/#appointment"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
                        color: "#FFFFFF",
                      }}
                    >
                      Book {category.title}
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
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-20 lg:py-24"
        style={{
          background: "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll variants={fadeInUp} className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#FFFFFF",
              }}
            >
              Why Our Pricing is{" "}
              <span style={{ color: "#BFA37C" }}>Different</span>
            </h2>
          </AnimateOnScroll>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {[
              {
                icon: "💎",
                title: "Premium Quality",
                desc: "Top-grade materials and latest technology",
              },
              {
                icon: "📋",
                title: "No Hidden Fees",
                desc: "Transparent pricing with detailed breakdown",
              },
              {
                icon: "💳",
                title: "Flexible Payment",
                desc: "Easy payment plans for major treatments",
              },
              {
                icon: "✓",
                title: "Value Guarantee",
                desc: "Best value for quality dental care",
              },
            ].map((item) => (
              <StaggerItem key={item.title} variants={scaleIn}>
                <div
                  className="p-6 rounded-2xl text-center h-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32" style={{ background: "#FDFCFA" }}>
        <div className="mx-auto max-w-4xl px-6">
          <AnimateOnScroll variants={fadeInUp} className="text-center mb-14">
            <span
              className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#BFA37C" }}
            >
              Questions?
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#0A2342",
              }}
            >
              Pricing FAQs
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {faqs.map((faq) => (
              <StaggerItem key={faq.question} variants={fadeInUp}>
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: "0 2px 20px -5px rgba(10, 35, 66, 0.08)",
                    border: "1px solid rgba(191, 163, 124, 0.15)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#BFA37C" }}
                    />
                    <div>
                      <h4
                        className="font-bold mb-2"
                        style={{ color: "#0A2342" }}
                      >
                        {faq.question}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#5A6573" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 lg:py-32"
        style={{
          background: "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <AnimateOnScroll variants={fadeInUp}>
            <Sparkles
              className="w-12 h-12 mx-auto mb-6"
              style={{ color: "#BFA37C" }}
            />
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#FFFFFF",
              }}
            >
              Ready to Start Your
              <span className="block" style={{ color: "#BFA37C" }}>
                Smile Journey?
              </span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll variants={fadeInUp} delay={0.1}>
            <p
              className="text-lg mb-10 max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Book a consultation today and get a personalized treatment plan
              with accurate pricing for your specific needs.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variants={scaleIn} delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
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
                href="/all-services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                style={{
                  background: "transparent",
                  color: "#FFFFFF",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                View All Services
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
