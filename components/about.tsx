"use client";

import Image from "next/image";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  scaleIn,
} from "./motion";

const doctors = [
  {
    name: "Dr. Ahmed ",
    specialty: "BDS, MSc Periodontology",
    image: "/images/doctor-5.jpg",
  },
  {
    name: "Dr. Sharqa ",
    specialty: "BDS, Orthodontics",
    image: "/images/doctor-5.jpg",
  },

  {
    name: "Dr. Saif Rasool",
    specialty: "BDS",
    image: "/images/doctor-7.jpg",
  },

  {
    name: "Awais (Dental Assistant)",
    specialty: "ASSISTANT",
    image: "/images/doctor-7.jpg",
  },
  {
    name: "Esha (Receptionist)",
    specialty: "FRONT DESK",
    image: "/images/doctor-6.jpg",
  },
];

export function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <AnimateOnScroll
          variants={fadeInUp}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p
            className="text-sm font-bold uppercase tracking-[0.25em]"
            style={{ color: "#BFA37C" }}
          >
            EXPERT CARE
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "#0A2342",
            }}
          >
            Transforming Your Smile with Care and Precision
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed mx-auto max-w-prose"
            style={{ color: "#5A5A5A" }}
          >
            Located at Nishat Colony at the back side of DHA phase 1, Lahore –
            <span
              className="block font-medium italic"
              style={{ color: "#0A2342" }}
            >
              where comfort meets confident smiles.
            </span>
            Complete dental care for the whole family, delivered with kindness,
            precision, and modern technology.
          </p>

          {/* additional description about doctors can remain if desired */}
          <p
            className="mt-4 text-lg leading-relaxed mx-auto max-w-prose"
            style={{ color: "#5A5A5A" }}
          >
            Our team of specialists at Dental Ease—dentists, assistants and
            front‑desk staff—bring decades of combined experience and a passion
            for exceptional patient care.
          </p>
        </AnimateOnScroll>

        {/* Doctors Grid */}
        <StaggerContainer
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.15}
        >
          {doctors.map((doctor) => (
            <StaggerItem key={doctor.name} variants={scaleIn}>
              <div
                className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{ border: "1px solid #E8E3D3" }}
              >
                {/* Doctor Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={`${doctor.name}, ${doctor.specialty} at Dental Ease`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "saturate(0.9)" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Doctor Info */}
                <div
                  className="relative p-6 text-center transition-all duration-300"
                  style={{
                    borderBottom: "3px solid transparent",
                  }}
                >
                  {/* Gold border on hover - using pseudo element via wrapper */}
                  <div
                    className="absolute bottom-0 left-0 h-[3px] w-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: "#BFA37C" }}
                  />

                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      color: "#0A2342",
                    }}
                  >
                    {doctor.name}
                  </h3>
                  <p
                    className="mt-1 text-xs font-medium uppercase tracking-widest"
                    style={{ color: "#888888" }}
                  >
                    {doctor.specialty}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All Button */}
        <AnimateOnScroll variants={fadeInUp} delay={0.3}>
          <div className="mt-12 flex justify-center">
            <button
              className="rounded-md px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #BFA37C",
                color: "#BFA37C",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#BFA37C";
                e.currentTarget.style.color = "#0A2342";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#BFA37C";
              }}
            >
              View All Doctors
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
