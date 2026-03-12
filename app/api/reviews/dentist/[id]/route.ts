import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/reviews/dentist/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const approvedOnly = searchParams.get("approved") !== "false";
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Verify dentist exists
    const { data: dentist, error: dentistError } = await supabase
      .from("dentists")
      .select("id, name, specialization")
      .eq("id", params.id)
      .single();

    if (dentistError || !dentist) {
      return NextResponse.json({ error: "Dentist not found" }, { status: 404 });
    }

    // Build query
    let query = supabase
      .from("reviews")
      .select("*", { count: "exact" })
      .eq("dentist_id", params.id)
      .eq("is_visible", true)
      .order("created_at", { ascending: false });

    if (approvedOnly) {
      query = query.eq("is_approved", true);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: reviews, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate average rating
    const allReviews = await supabase
      .from("reviews")
      .select("rating")
      .eq("dentist_id", params.id)
      .eq("is_approved", true)
      .eq("is_visible", true);

    const avgRating =
      allReviews.data && allReviews.data.length > 0
        ? allReviews.data.reduce((sum, r) => sum + r.rating, 0) / allReviews.data.length
        : 0;

    const ratingDistribution = {
      5: allReviews.data?.filter(r => r.rating === 5).length || 0,
      4: allReviews.data?.filter(r => r.rating === 4).length || 0,
      3: allReviews.data?.filter(r => r.rating === 3).length || 0,
      2: allReviews.data?.filter(r => r.rating === 2).length || 0,
      1: allReviews.data?.filter(r => r.rating === 1).length || 0,
    };

    return NextResponse.json({
      dentist,
      reviews: reviews || [],
      stats: {
        total_reviews: allReviews.data?.length || 0,
        average_rating: Math.round(avgRating * 10) / 10,
        rating_distribution: ratingDistribution,
      },
      pagination: {
        total: count,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    });
  } catch (error) {
    console.error("Error fetching dentist reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch dentist reviews" },
      { status: 500 }
    );
  }
}
