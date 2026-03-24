// @ts-ignore: Deno runtime import is valid for Supabase Edge Functions
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = "re_WQ2tAtPe_JrxcSu7vEsFUwNu9KTZah2Ds";
const FROM_EMAIL = "onboarding@resend.dev";

serve(async (req: Request) => {
  // Handle CORS Preflight for security
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  try {
    // Supabase Webhooks send the data inside a 'record' object
    const { record } = await req.json();

    if (!record || !record.email) {
      throw new Error("No email found in the database record.");
    }

    // 2. Call Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [record.email],
        subject: "Message Received - Dental Clinic",
        html: `<strong>Hello ${record.name || 'Patient'},</strong><p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>`,
      }),
    });

    const resData = await res.json();

    return new Response(JSON.stringify({ message: "Email sent!", details: resData }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) message = error.message;
    else if (typeof error === "string") message = error;
    console.error("Function Error:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});