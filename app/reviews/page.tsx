"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export default function ReviewsPage() {
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
    .eq("is_visible", true) // no longer require approval
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    setReviews([]);
  } else {
    setReviews(data || []);
  }
  setLoading(false);
};

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">All Reviews</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-b-2 border-[#BFA37C] rounded-full"></div>
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
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

              <p className="italic text-gray-600 leading-7">"{review.content}"</p>

              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#0A2342] text-white font-bold">
                    {review.reviewer_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
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

      <div className="flex justify-center mt-12">
        <Button
          className="bg-[#0A2342] text-white px-8 py-3"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}