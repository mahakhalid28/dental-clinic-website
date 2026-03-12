"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  scaleIn,
} from "./motion";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  content: string;
  title?: string;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

// Fallback reviews in case API fails or no reviews exist
const fallbackReviews: Review[] = [
  {
    id: "1",
    reviewer_name: "Maria Gonzalez",
    rating: 5,
    content:
      "I used to dread going to the dentist until I found this clinic. The team is incredibly gentle, thorough, and always makes me feel at ease.",
    is_approved: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    reviewer_name: "James O'Brien",
    rating: 5,
    content:
      "The implant procedure was seamless from consultation to final result. I can eat, smile, and laugh with complete confidence again.",
    is_approved: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    reviewer_name: "Aisha Patel",
    rating: 5,
    content:
      "The office is beautiful, the staff is warm, and the results speak for themselves. I recommend this clinic to everyone I know.",
    is_approved: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

// Helper to get initials from name
const getInitials = (name: string) => {
  if (!name) return "?";
  return (
    name
      .split(" ")
      .map((n) => n[0])
      .join(".")
      .toUpperCase() + "."
  );
};

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const responseData = await response.json();
        // API returns { data: [...], pagination: {...} } - extract the data array
        const reviewsArray = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData.data)
            ? responseData.data
            : [];
        // Filter to show only approved reviews, prioritize featured ones
        const approvedReviews = reviewsArray
          .filter((r: Review) => r.is_approved)
          .sort((a: Review, b: Review) => {
            // Featured first, then by date
            if (a.is_featured && !b.is_featured) return -1;
            if (!a.is_featured && b.is_featured) return 1;
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          })
          .slice(0, 6); // Show max 6 reviews

        setReviews(
          approvedReviews.length > 0 ? approvedReviews : fallbackReviews,
        );
      } else {
        setReviews(fallbackReviews);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews(fallbackReviews);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BFA37C]"></div>
          </div>
        ) : (
          /* Testimonials Grid */
          <StaggerContainer
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.12}
          >
            {reviews.map((review) => (
              <StaggerItem key={review.id} variants={scaleIn}>
                <div
                  className="group relative flex flex-col rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 h-full"
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
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        style={{ fill: "#BFA37C", color: "#BFA37C" }}
                      />
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <Star
                        key={`empty-${i}`}
                        className="h-4 w-4"
                        style={{ fill: "transparent", color: "#BFA37C" }}
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
                    "{review.content}"
                  </p>

                  {/* Author */}
                  <div
                    className="mt-6 flex items-center justify-between border-t pt-4"
                    style={{ borderColor: "#E8E3D3" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                        style={{ backgroundColor: "#0A2342", color: "#FFFFFF" }}
                      >
                        {getInitials(review.reviewer_name)}
                      </div>
                      <p className="font-semibold" style={{ color: "#333333" }}>
                        {review.reviewer_name}
                      </p>
                    </div>
                    {review.is_featured && (
                      <span
                        className="text-xs font-medium uppercase tracking-wide px-2 py-1 rounded"
                        style={{ backgroundColor: "#BFA37C", color: "#FFFFFF" }}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

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
