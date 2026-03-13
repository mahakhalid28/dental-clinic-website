"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  scaleIn,
} from "./motion";

interface Dentist {
  id: string;
  name: string;
  specialization: string;
  profile_image: string;
}

export function About() {
  const [doctors, setDoctors] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded images for Ahmed and Sharqa
  const hardcodedImages: { [key: string]: string } = {
    "ahmed": "ahmed.png",
    "sharqa": "sharqa.png",
  };

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await fetch("/api/dentists");
        if (response.ok) {
          const data = await response.json();
          
          // Update images for Ahmed and Sharqa if they exist
          const updatedDoctors = data.map((doctor: Dentist) => {
            const lowerName = doctor.name.toLowerCase();
            for (const [key, imageName] of Object.entries(hardcodedImages)) {
              if (lowerName.includes(key)) {
                return { ...doctor, profile_image: imageName };
              }
            }
            return doctor;
          });
          
          setDoctors(updatedDoctors);
        } else {
          console.error("API Error:", response.status);
          // Fallback to hardcoded doctors if API fails
          setDoctors([
            { id: "1", name: "Dr. Ahmed", specialization: "General Dentistry", profile_image: "ahmed.png" },
            { id: "2", name: "Dr. Sharqa", specialization: "Orthodontics", profile_image: "sharqa.png" },
                                { id: "3", name: "Dr. Saif", specialization: "BDS", profile_image: "saif.png" }

          ]);
        }
      } catch (error) {
        console.error("Failed to fetch dentists:", error);
        // Fallback to hardcoded doctors if fetch fails
        setDoctors([
          { id: "1", name: "Dr. Ahmed", specialization: "General Dentistry", profile_image: "ahmed.png" },
          { id: "2", name: "Dr. Sharqa", specialization: "Orthodontics", profile_image: "sharqa.png" },
                    { id: "3", name: "Dr. Saif", specialization: "BDS", profile_image: "saif.png" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, []);
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
          {loading ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Loading doctors...
            </div>
          ) : doctors.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No doctors available
            </div>
          ) : (
            doctors.map((doctor) => (
              <StaggerItem key={doctor.id} variants={scaleIn}>
                <div
                  className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  style={{ border: "1px solid #E8E3D3" }}
                >
                  {/* Doctor Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={
                        doctor.profile_image
                          ? doctor.profile_image.startsWith("/")
                            ? doctor.profile_image
                            : `/images/${doctor.profile_image}`
                          : "/images/doctor-1.jpg"
                      }
                      alt={`${doctor.name}, ${doctor.specialization} at Dental Ease`}
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
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))
          )}
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
