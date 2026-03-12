import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/reviews
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get("approved");
    const featured = searchParams.get("featured");
    const dentist_id = searchParams.get("dentist_id");
    const minRating = searchParams.get("min_rating");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
      .from("reviews")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Apply filters
    if (approved === "true") {
      query = query.eq("is_approved", true);
    } else if (approved === "false") {
      query = query.eq("is_approved", false);
    }

    if (featured === "true") {
      query = query.eq("is_featured", true);
    }

    if (dentist_id) {
      query = query.eq("dentist_id", dentist_id);
    }

    if (minRating) {
      query = query.gte("rating", parseInt(minRating));
    }

    // Only show visible reviews for public requests
    if (approved === "true") {
      query = query.eq("is_visible", true);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: reviews, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch related dentist data
    if (reviews && reviews.length > 0) {
      const dentistIds = [...new Set(reviews.map(r => r.dentist_id).filter(Boolean))];

      if (dentistIds.length > 0) {
        const { data: dentists } = await supabase
          .from("dentists")
          .select("id, name, specialization")
          .in("id", dentistIds);

        const enrichedReviews = reviews.map(review => ({
          ...review,
          dentist: dentists?.find(d => d.id === review.dentist_id),
        }));

        return NextResponse.json({
          data: enrichedReviews,
          pagination: {
            total: count,
            limit,
            offset,
            hasMore: (count || 0) > offset + limit,
          },
        });
      }
    }

    return NextResponse.json({
      data: reviews || [],
      pagination: {
        total: count,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.reviewer_name || !body.content || !body.rating) {
      return NextResponse.json(
        { error: "Reviewer name, content, and rating are required" },
        { status: 400 }
      );
    }

    // Validate rating
    const rating = parseInt(body.rating);
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          patient_id: body.patient_id || null,
          dentist_id: body.dentist_id || null,
          appointment_id: body.appointment_id || null,
          reviewer_name: body.reviewer_name,
          reviewer_email: body.reviewer_email || null,
          rating,
          title: body.title || null,
          content: body.content,
          source: body.source || "website",
          is_featured: false,
          is_approved: false, // Reviews require approval
          is_visible: true,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Review submitted successfully. It will be visible after approval.", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
