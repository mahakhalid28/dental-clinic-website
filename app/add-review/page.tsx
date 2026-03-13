"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function AddReviewPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !content || rating < 1 || rating > 5) {
      setError("Please fill in all fields with valid data.");
      return;
    }

    setLoading(true);

    // INSERT REVIEW with immediate visibility
    const { error: supabaseError } = await supabase.from("reviews").insert([
      {
        reviewer_name: name,
        rating,
        content,
        is_approved: false, // Admin approval required for "featured"
        is_visible: true,   // Show immediately
        is_featured: false,
      },
    ]);

    setLoading(false);

    if (supabaseError) {
      setError("Failed to submit review. Please try again.");
      console.error(supabaseError);
    } else {
      setSuccess("Your review has been submitted successfully!");
      setName("");
      setRating(5);
      setContent("");

      // Optionally redirect to testimonials page
      // router.push("/reviews");
    }
  };

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#BFA37C" }}
          >
            PATIENT FEEDBACK
          </p>
          <h1
            className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Add Your Review
          </h1>
          <p className="mt-2 text-gray-600">
            Share your experience with our clinic. Your review will appear immediately.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#F9F7F1] p-8 rounded-xl shadow-lg border border-[#E8E3D3]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 font-medium">{error}</p>}
            {success && <p className="text-green-600 font-medium">{success}</p>}

            {/* Name */}
            <div>
              <label className="block font-semibold mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#BFA37C]"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block font-semibold mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#BFA37C]"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Review */}
            <div>
              <label className="block font-semibold mb-2">Review</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Write your review here..."
                className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#BFA37C]"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="bg-[#0A2342] text-white w-full py-3 text-sm font-semibold tracking-wider rounded-md transition hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </div>

      </div>
    </section>
  );
}