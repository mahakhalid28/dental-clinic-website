"use client";

import Image from "next/image";

const doctors = [
  {
    name: "Dr. Richard Fordjour",
    specialty: "COSMETIC DENTIST",
    image: "/images/doctor-1.jpg",
  },
  {
    name: "Dr. Sarah Chen",
    specialty: "IMPLANT SPECIALIST",
    image: "/images/doctor-2.jpg",
  },
  {
    name: "Dr. Michael Torres",
    specialty: "ORTHODONTIST",
    image: "/images/doctor-3.jpg",
  },
  {
    name: "Dr. Emily Watson",
    specialty: "PEDIATRIC DENTIST",
    image: "/images/doctor-4.jpg",
  },
];

export function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
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
            Meet Our Doctors
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "#5A5A5A" }}
          >
            Our team of specialists at Dental Ease brings decades of combined
            experience and a passion for exceptional patient care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
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
          ))}
        </div>

        {/* View All Button */}
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
      </div>
    </section>
  );
}
