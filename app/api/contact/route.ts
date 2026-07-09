import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/emailService";

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
