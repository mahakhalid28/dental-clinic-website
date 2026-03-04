"use client";

import Image from "next/image";
import Link from "next/link";

const allServices = [
  {
    title: "General Dentistry",
    image: "/images/service-general.jpg",
    treatments: [
      {
        name: "OPD Consultation",
        price: "800",
        description:
          "Comprehensive clinical examination including oral cancer screening, periodontal assessment, and a personalised treatment plan. Our dentists review medical history, discuss concerns, and recommend next steps to keep your smile healthy.",
        image: "/images/opd.png"
      },
      {
        name: "Scaling",
        price: "12,000",
        description:
          "Deep professional scaling and polishing to remove hardened tartar (calculus) and surface stains. Performed with ultrasonic and hand instruments, followed by polishing and post-care advice to improve gum health and prevent recurrence.",
        image: "/images/scaling.png"
      },
      {
        name: "Filling",
        price: "5,000",
        description:
          "Tooth-coloured restorative fillings to repair cavities or small fractures using modern composite materials. We prioritise conservative preparation, shade-matching and occlusion checks to restore function and aesthetics.",
        image: "/images/filling.png"
      },
      {
        name: "Polishing",
        price: "3,000",
        description:
          "Gentle polishing treatment that removes surface stains and smooths enamel for a cleaner, brighter appearance. Often performed immediately after scaling to leave teeth feeling refreshed and looking their best.",
        image: "/images/polishing.png"
      },
      {
        name: "Root Planing",
        price: "2,000",
        description:
          "Targeted deep-cleaning beneath the gumline to remove plaque and calculus from tooth roots, reduce pocket depths and encourage gum reattachment. Recommended for patients with moderate to advanced periodontal disease.",
        image: "/images/planing.png"
      },
      {
        name: "Simple Extraction",
        price: "4,000",
        description:
          "Routine tooth removal using local anaesthesia to ensure patient comfort. Our team follows careful extraction protocols and provides post-operative instructions and support for smooth recovery.",
        image: "/images/extraction.png"
      },
      {
        name: "Surgical Extraction",
        price: "15,000",
        description:
          "Surgical removal of impacted or broken teeth that cannot be removed by simple extraction, often involving minor incisions and sutures. Procedures are done with appropriate anaesthesia and post-op care is provided to manage pain and healing.",
        image: "/images/extraction.png"
      }
    ]
  },
  {
    title: "Cosmetic Dentistry",
    image: "/images/service-cosmetic.jpg",
    treatments: [
      {
        name: "Teeth Whitening",
        price: "30,000",
        description:
          "In-office whitening using professional-grade bleaching agents to safely lift deep stains and significantly brighten teeth in a single visit. We customise treatment strength and duration for optimal, long-lasting results.",
        image: "/images/whitening.png"
      },
      {
        name: "Depigmentation",
        price: "10,000",
        description:
          "Gum depigmentation (gingival whitening) uses gentle, controlled techniques to reduce excessive melanin/pigmentation for a more even, aesthetic gum line. Ideal for patients seeking cosmetic improvement of gum colour.",
        image: "/images/depigmentation.png"
      },
      {
        name: "Crown & Bridges",
        price: "8,000",
        description:
          "Custom-made crowns and bridges restore function, protect weakened teeth, and replace missing teeth for improved chewing and aesthetics. We use high-quality materials and precise lab work for a natural-looking finish.",
        image: "/images/bridges.png"
      },
      {
        name: "Veneering",
        price: "Custom",
        description:
          "Porcelain or composite veneers are ultra-thin shells bonded to the front of teeth to correct chips, gaps, discolouration, or minor misalignment. Treatment is personalised for shape, colour and symmetry to create a natural, beautiful smile.",
        image: "/images/veneer.png"
      },
      {
        name: "Crown Lengthening",
        price: "4,000",
        description:
          "A periodontal procedure to expose more tooth structure by reshaping gum and, if needed, bone tissue. This improves crown fit and aesthetics for restorative or cosmetic needs and can create a more balanced smile.",
        image: "/images/crown.png"
      }
    ]
  },
  {
    title: "Dental Implants",
    image: "/images/service-implants.jpg",
    treatments: [
      {
        name: "Dental Implants",
        price: "60,000",
        description:
          "Dental implants offer a durable, natural-looking solution to replace missing teeth. The titanium implant integrates with the jawbone to provide stable support for crowns, bridges or overdentures and restores chewing function and confidence.",
        image: "/images/service-implants.jpg"
      }
    ]
  },
  {
    title: "Orthodontics",
    image: "/images/service-orthodontics.jpg",
    treatments: [
      {
        name: "Braces",
        price: "100,000",
        description:
          "Comprehensive orthodontic treatment using fixed braces to correct misalignment, crowding and bite issues. Treatment plans are customised and monitored regularly to achieve predictable, long-term alignment and functional results.",
        image: "/images/service-orthodontics.jpg"
      }
    ]
  },
  {
    title: "Teeth Whitening",
    image: "/images/service-whitening.jpg",
    treatments: [
      {
        name: "Professional Whitening",
        price: "30,000",
        description:
          "Clinically supervised whitening that delivers safe, dramatic whitening in a short timeframe. We evaluate enamel sensitivity and provide post-treatment care to maintain results.",
        image: "/images/whitening.png"
      }
    ]
  },
  {
    title: "Pediatric Care",
    image: "/images/service-pediatric.jpg",
    treatments: [
      {
        name: "Children's Dental Care",
        price: "Varies",
        description:
          "Child-friendly dentistry focused on prevention, education and gentle treatment. Services include regular exams, fluoride, fissure sealants, growth monitoring and behaviourally appropriate approaches to build positive dental experiences.",
        image: "/images/service-pediatric.jpg"
      }
    ]
  },
];

// Featured treatments for home page
const featuredTreatments = [
  {
    name: "OPD Consultation",
    price: "800",
    description:
      "Comprehensive clinical examination including oral cancer screening, periodontal assessment, and a personalised treatment plan. Our dentists review medical history, discuss concerns, and recommend next steps to keep your smile healthy.",
    image: "/images/opd.png",
  },
  {
    name: "Scaling",
    price: "12,000",
    description:
      "Deep professional scaling and polishing to remove hardened tartar (calculus) and surface stains. Performed with ultrasonic and hand instruments, followed by polishing and post-care advice to improve gum health and prevent recurrence.",
    image: "/images/scaling.png",
  },
  {
    name: "Filling",
    price: "5,000",
    description:
      "Tooth-coloured restorative fillings to repair cavities or small fractures using modern composite materials. We prioritise conservative preparation, shade-matching and occlusion checks to restore function and aesthetics.",
    image: "/images/filling.png",
  }
];

export function Services() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] mb-4"
            style={{
              color: "#BFA37C",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            What We Offer
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight mb-6 md:text-4xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#0A2342",
              letterSpacing: "0.02em",
            }}
          >
            Comprehensive Dental Services
          </h2>
        </div>

        {/* Featured Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredTreatments.map((treatment) => (
            <div
              key={treatment.name}
              className="p-6 rounded-lg border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: "#E8E3D3", backgroundColor: "#FAFAF8" }}
            >
              <div className="mb-3 flex items-center justify-center">
                <img src={treatment.image} alt={treatment.name} className="h-64 w-64 object-contain" />
              </div>
              <h3
                className="text-lg font-semibold mb-2 text-center"
                style={{ color: "#0A2342" }}
              >
                {treatment.name}
              </h3>
              <p
                className="text-sm mb-4 leading-relaxed text-center"
                style={{ color: "#5A5A5A" }}
              >
                {treatment.description}
              </p>
              {/* price hidden on main services page; see /pricing for full pricing */}
            </div>
          ))}
        </div>

        {/* View All / Pricing Button */}
        <div className="flex justify-center mb-8">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-[#BFA37C]"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              backgroundColor: "#0A2342",
              color: "#FFFFFF",
            }}
          >
            View Full Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AllServices() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] mb-4"
            style={{
              color: "#BFA37C",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Complete Treatment Menu
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight mb-6 md:text-4xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#0A2342",
              letterSpacing: "0.02em",
            }}
          >
            All Services & Pricing
          </h2>
          <p
            className="text-lg leading-relaxed mx-auto max-w-prose"
            style={{ color: "#5A5A5A" }}
          >
            Explore our complete range of dental treatments with detailed descriptions and transparent pricing.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {allServices.map((service) => (
            <div key={service.title} className="space-y-6">
              {/* Service Category Header */}
              <div>
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#0A2342",
                  }}
                >
                  {service.title}
                </h3>

                {/* Treatments List */}
                <div className="space-y-3">
                  {service.treatments.map((treatment) => (
                    <div
                      key={treatment.name}
                      className="p-4 rounded border transition-all duration-300 hover:shadow-md"
                      style={{ borderColor: "#E8E3D3", backgroundColor: "#FAFAF8" }}
                    >
                      <div className="flex items-start gap-4 mb-2">
                        <div className="flex-shrink-0">
                          <img
                            src={treatment.image ?? '/images/dental-services.jpg'}
                            alt={treatment.name}
                            className="h-48 w-48 object-contain rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4
                            className="text-base font-semibold"
                            style={{ color: "#0A2342" }}
                          >
                            {treatment.name}
                          </h4>
                          <p
                            className="text-sm leading-relaxed mt-1"
                            style={{ color: "#5A5A5A" }}
                          >
                            {treatment.description}
                          </p>
                        </div>
                        <div
                          className="text-base font-bold whitespace-nowrap ml-4"
                          style={{ color: "#BFA37C" }}
                        >
                          PKR {treatment.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Link */}
        <div className="flex justify-center mt-16">
          <Link
            href="/#services"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-[#BFA37C]"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              backgroundColor: "#0A2342",
              color: "#FFFFFF",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
