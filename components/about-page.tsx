"use client";

import Link from "next/link";
import {
  GraduationCap,
  Award,
  Heart,
  Users,
  Clock,
  Shield,
  Sparkles,
  Phone,
} from "lucide-react";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
} from "./motion";

// Team data
const teamMembers = [
  {
    name: "Dr. Ahmed",
    role: "Lead Dentist & Periodontist",
    specialty: "Periodontics & Gum Care",
    experience: "Specialist",
    education: "BDS, MSc Periodontology",
    image: "/images/ahmed.png",
    description:
      "Dr. Ahmed is our lead periodontist specializing in gum health and treatment. His expertise in periodontal care ensures patients receive the best treatment for gum diseases and overall oral health.",
  },
  {
    name: "Dr. Sharqa",
    role: "Orthodontist",
    specialty: "Braces & Teeth Alignment",
    experience: "Specialist",
    education: "BDS, Orthodontics",
    image: "/images/sharqa.png",
    description:
      "Dr. Sharqa specializes in orthodontic treatments, helping patients achieve beautifully aligned smiles through braces and modern alignment techniques.",
  },
  {
    name: "Dr. Saif Rasool",
    role: "General Dentist",
    specialty: "General Dentistry",
    experience: "Dentist",
    education: "BDS",
    image: "/images/saif.png",
    description:
      "Dr. Saif provides comprehensive general dental care including check-ups, fillings, and preventive treatments to maintain your oral health.",
  },
  {
    name: "Awais",
    role: "Dental Assistant",
    specialty: "Clinical Support",
    experience: "Assistant",
    education: "Certified Dental Assistant",
    image: "/images/staff-1.jpg",
    description:
      "Awais ensures smooth clinical operations, assisting our dentists during procedures and making sure patients are comfortable throughout their visit.",
  },
  {
    name: "Esha",
    role: "Receptionist",
    specialty: "Front Desk & Scheduling",
    experience: "Front Desk",
    education: "Patient Relations",
    image: "/images/staff-2.jpg",
    description:
      "Esha is the friendly face at our front desk, handling appointments, patient inquiries, and ensuring a welcoming experience for everyone.",
  },
];

// Gallery images - replace with actual clinic photos
const galleryImages = [
  {
    src: "/images/clinic-1.jpg",
    alt: "Modern Reception Area",
    category: "Reception",
  },
  {
    src: "/images/clinic-2.jpg",
    alt: "State-of-the-art Treatment Room",
    category: "Treatment",
  },
  {
    src: "/images/clinic-3.jpg",
    alt: "Advanced Dental Equipment",
    category: "Equipment",
  },
  {
    src: "/images/clinic-4.jpg",
    alt: "Comfortable Waiting Lounge",
    category: "Lounge",
  },
  {
    src: "/images/clinic-5.jpg",
    alt: "Sterilization Room",
    category: "Hygiene",
  },
  {
    src: "/images/clinic-6.jpg",
    alt: "Consultation Room",
    category: "Consultation",
  },
];

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description:
      "We treat every patient like family, with warmth, empathy, and understanding.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We pursue the highest standards in dental care, using advanced techniques and technology.",
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description:
      "Honest, transparent communication and ethical practice are our foundations.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We stay at the forefront of dental advancements to offer you the best care possible.",
  },
];

export function AboutPage() {
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
              About Us
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
              Where Smiles Are
              <span className="block" style={{ color: "#BFA37C" }}>
                Crafted with Care
              </span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll variants={fadeInUp} delay={0.2}>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Meet the dedicated team behind Dental Ease and discover why
              thousands of patients trust us with their smiles.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FDFCFA 0%, #F8F6F3 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <AnimateOnScroll variants={fadeInLeft}>
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  boxShadow: "0 25px 80px -20px rgba(10, 35, 66, 0.25)",
                }}
              >
                <div
                  className="aspect-[4/3] bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/clinic-main.jpg')",
                    backgroundColor: "#E8E3D3",
                  }}
                />
                {/* Gold accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-2"
                  style={{
                    background: "linear-gradient(90deg, #BFA37C, #D4B896)",
                  }}
                />
              </div>
            </AnimateOnScroll>

            {/* Content */}
            <AnimateOnScroll variants={fadeInRight}>
              <div>
                <span
                  className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-4"
                  style={{ color: "#BFA37C" }}
                >
                  Our Story
                </span>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#0A2342",
                  }}
                >
                  A Legacy of Excellence Since 2018
                </h2>
                <div
                  className="space-y-4 text-base leading-relaxed"
                  style={{ color: "#5A6573" }}
                >
                  <p>
                    Dental Ease was founded with a simple yet powerful vision:
                    to make exceptional dental care accessible to everyone in
                    Lahore. What started as a small practice has grown into a
                    trusted name in dental healthcare.
                  </p>
                  <p>
                    Our journey began when Dr. Ahmed Qureshi, after years of
                    experience in renowned dental institutions, decided to
                    create a space where patients feel genuinely cared for—where
                    advanced technology meets compassionate service.
                  </p>
                  <p>
                    Today, we're proud to have served over 5,000 patients,
                    helping them achieve healthier, more confident smiles. Our
                    commitment to excellence, continuous learning, and
                    patient-first approach remains unchanged.
                  </p>
                </div>

                {/* Mini Stats */}
                <div
                  className="grid grid-cols-3 gap-6 mt-10 pt-10"
                  style={{ borderTop: "1px solid rgba(191, 163, 124, 0.2)" }}
                >
                  {[
                    { number: "8+", label: "Years" },
                    { number: "5000+", label: "Patients" },
                    { number: "3+", label: "Dentists" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p
                        className="text-3xl font-bold"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          color: "#0A2342",
                        }}
                      >
                        {stat.number}
                      </p>
                      <p className="text-sm mt-1" style={{ color: "#BFA37C" }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section
        className="py-20 lg:py-24"
        style={{
          background: "linear-gradient(135deg, #0A2342 0%, #0D2B4D 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll variants={fadeInUp} className="text-center mb-16">
            <span
              className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#BFA37C" }}
            >
              What Drives Us
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#FFFFFF",
              }}
            >
              Our Core Values
            </h2>
          </AnimateOnScroll>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {values.map((value) => (
              <StaggerItem key={value.title} variants={scaleIn}>
                <div
                  className="p-8 rounded-2xl text-center h-full transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(191, 163, 124, 0.15)" }}
                  >
                    <value.icon
                      className="w-7 h-7"
                      style={{ color: "#BFA37C" }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: "#FFFFFF" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Meet the Team */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #FDFCFA 0%, #F8F6F3 50%, #F5F3EF 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll variants={fadeInUp} className="text-center mb-16">
            <span
              className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#BFA37C" }}
            >
              Our Team
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#0A2342",
              }}
            >
              Meet Our Professional Staff
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: "#5A6573" }}
            >
              Our dedicated team of dental professionals and support staff work
              together to provide you with exceptional care and a comfortable
              experience.
            </p>
          </AnimateOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            staggerDelay={0.12}
          >
            {teamMembers.map((member) => (
              <StaggerItem key={member.name} variants={scaleIn}>
                <div
                  className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-3"
                  style={{
                    background:
                      "linear-gradient(180deg, #FAF6F1 0%, #F5EFE8 100%)",
                    borderRadius: "24px",
                    boxShadow:
                      "0 0 0 1px rgba(191, 163, 124, 0.15), 0 8px 40px -8px rgba(10, 35, 66, 0.12)",
                  }}
                >
                  {/* Photo */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden"
                    style={{
                      borderRadius: "24px 24px 0 0",
                      backgroundColor: "#E8E3D3",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${member.image}')` }}
                    />
                    {/* Overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(10, 35, 66, 0.9) 0%, transparent 60%)",
                      }}
                    >
                      <p className="text-sm text-white leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                    {/* Gold accent */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #BFA37C, transparent)",
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: "#0A2342",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="text-sm font-semibold mb-2"
                      style={{ color: "#BFA37C" }}
                    >
                      {member.role}
                    </p>
                    <p className="text-xs mb-3" style={{ color: "#5A6573" }}>
                      {member.specialty}
                    </p>
                    <div
                      className="flex items-center justify-center gap-2 text-xs"
                      style={{ color: "#9CA3AF" }}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Clinic Gallery */}
      <section className="py-24 lg:py-32" style={{ background: "#FDFCFA" }}>
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll variants={fadeInUp} className="text-center mb-16">
            <span
              className="inline-block text-sm font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#BFA37C" }}
            >
              Our Facility
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#0A2342",
              }}
            >
              Tour Our Clinic
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: "#5A6573" }}
            >
              Experience our modern, comfortable facilities equipped with
              state-of-the-art technology for your dental care needs.
            </p>
          </AnimateOnScroll>

          <StaggerContainer
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            staggerDelay={0.08}
          >
            {galleryImages.map((image, index) => (
              <StaggerItem key={image.alt} variants={scaleIn}>
                <div
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{
                    boxShadow: "0 8px 30px -10px rgba(10, 35, 66, 0.15)",
                  }}
                >
                  <div
                    className={`aspect-square bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${
                      index === 0 ? "md:aspect-[4/3]" : ""
                    }`}
                    style={{
                      backgroundImage: `url('${image.src}')`,
                      backgroundColor: "#E8E3D3",
                    }}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10, 35, 66, 0.85) 0%, transparent 50%)",
                    }}
                  >
                    <div>
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "#BFA37C" }}
                      >
                        {image.category}
                      </span>
                      <p className="text-white font-medium mt-1">{image.alt}</p>
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
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#FFFFFF",
              }}
            >
              Ready to Experience the
              <span className="block" style={{ color: "#BFA37C" }}>
                Dental Ease Difference?
              </span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll variants={fadeInUp} delay={0.1}>
            <p
              className="text-lg mb-10 max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Join thousands of satisfied patients who trust us with their
              smiles. Book your appointment today and discover premium dental
              care.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variants={scaleIn} delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
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
                <Phone className="w-5 h-5" style={{ color: "#BFA37C" }} />
                Call: 0308-8402625
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
