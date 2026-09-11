import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/emailService";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, size, notes } = body;

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Name, email, and service are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      const supabase = await getSupabaseServerClient();
      const { error } = await supabase.from("leads").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        service: service.trim(),
        size: size?.trim() || null,
        notes: notes?.trim() || null,
      });

      if (error) {
        console.error("Lead persistence error:", error);
        return NextResponse.json({ error: "We could not save your request. Please try again." }, { status: 500 });
      }
    }

    await sendContactEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      service: service.trim(),
      message: `Service: ${service}\nSize/Position: ${size || "N/A"}\n\nNotes: ${notes || "None"}`,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
