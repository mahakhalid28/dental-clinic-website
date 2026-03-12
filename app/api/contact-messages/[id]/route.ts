import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET /api/contact-messages/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Message not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Mark as read if unread
    if (data.status === "unread") {
      await supabase
        .from("contact_messages")
        .update({ status: "read" })
        .eq("id", params.id);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch message" },
      { status: 500 }
    );
  }
}

// PUT /api/contact-messages/:id (update status)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const validStatuses = ["unread", "read", "replied", "archived"];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = {};
    if (body.status) updateData.status = body.status;
    if (body.status === "replied") {
      updateData.replied_at = new Date().toISOString();
      if (body.replied_by) updateData.replied_by = body.replied_by;
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Message not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
}

// DELETE /api/contact-messages/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
