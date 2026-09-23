import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const quoteSchema = z.object({
  service: z.string().min(2),
  designType: z.string().min(2),
  quantity: z.coerce.number().int().min(1),
  requiredFormat: z.string().min(2),
  size: z.string().min(2),
  colorRequirements: z.string().max(300).optional(),
  deadline: z.string().optional(),
  priority: z.enum(["standard", "rush", "same_day"]),
  description: z.string().min(20).max(5000),
  additionalInstructions: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Please sign in before requesting a quote." }, { status: 401 });
    const parsed = quoteSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Please check the quote details and try again." }, { status: 400 });

    const values = parsed.data;
    const { data, error } = await supabase.from("quotes").insert({
      client_id: user.id,
      service: values.service,
      design_type: values.designType,
      quantity: values.quantity,
      required_format: values.requiredFormat,
      size: values.size,
      color_requirements: values.colorRequirements || null,
      deadline: values.deadline || null,
      priority: values.priority,
      description: values.description,
      additional_instructions: values.additionalInstructions || null,
    }).select("id, quote_number, status").single();
    if (error || !data) {
      console.error("Quote creation failed", {
        code: error?.code,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
      });
      return NextResponse.json({ error: process.env.NODE_ENV === "development" && error?.code ? `Quote database error (${error.code}). Check the server terminal.` : "We could not save your quote request." }, { status: 500 });
    }
    return NextResponse.json({ quote: data }, { status: 201 });
  } catch (error) {
    console.error("Quote API error", error);
    return NextResponse.json({ error: "Something went wrong while creating the quote." }, { status: 500 });
  }
}
