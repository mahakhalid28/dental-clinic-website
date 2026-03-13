"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  content: string;
  is_approved: boolean;
  is_featured: boolean;
  is_visible?: boolean;
  created_at: string;
}

const fallbackReviews: Review[] = [
  {
    id: "1",
    reviewer_name: "Maria Gonzalez",
    rating: 5,
    content: "The dental team is incredibly gentle and professional.",
    is_approved: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

const getInitials = (name: string) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .eq("is_visible", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Supabase error:", error);
      setReviews(fallbackReviews);
    } else if (data && data.length > 0) {
      const sorted = data.sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      });

      setReviews(sorted);
    } else {
      setReviews(fallbackReviews);
    }

    setLoading(false);
  };

  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#BFA37C]">
            PATIENT TESTIMONIALS
          </p>
          <h2 className="mt-4 text-4xl font-bold">
            Hear from our patients
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-b-2 border-[#BFA37C] rounded-full"></div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-lg border border-[#E8E3D3] hover:shadow-lg transition"
              >

                <div className="flex mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#BFA37C] text-[#BFA37C]"
                    />
                  ))}
                </div>

                <p className="italic text-gray-600 leading-7">
                  "{review.content}"
                </p>

                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#0A2342] text-white font-bold">
                      {getInitials(review.reviewer_name)}
                    </div>

                    <p className="font-semibold">{review.reviewer_name}</p>
                  </div>

                  {review.is_featured && (
                    <span className="text-xs bg-[#BFA37C] text-white px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center mt-12 gap-4">
          <Button
            className="bg-[#0A2342] text-white px-8 py-3"
            onClick={() => router.push("/reviews")}
          >
            All Reviews
          </Button>
          <Button
            className="bg-[#BFA37C] text-white px-8 py-3"
            onClick={() => router.push("/add-review")}
          >
            Add Review
          </Button>
        </div>

      </div>
    </section>
  );
}