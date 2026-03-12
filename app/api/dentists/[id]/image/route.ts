import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// POST /api/dentists/:id/image
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if dentist exists
    const { data: dentist, error: fetchError } = await supabase
      .from("dentists")
      .select("id")
      .eq("id", params.id)
      .single();

    if (fetchError || !dentist) {
      return NextResponse.json({ error: "Dentist not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `dentist_${params.id}_${Date.now()}.${fileExt}`;
    const filePath = `dentists/${fileName}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    // Update dentist record with new image URL
    const { data: updatedDentist, error: updateError } = await supabase
      .from("dentists")
      .update({ image: imageUrl })
      .eq("id", params.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Image uploaded successfully",
      image_url: imageUrl,
      dentist: updatedDentist,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
