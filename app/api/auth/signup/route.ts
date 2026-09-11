import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Portal backend is not configured yet." }, { status: 503 });
  }

  const { name, company, email, password } = await request.json();
  if (!name || !email || !password || password.length < 8) {
    return NextResponse.json({ error: "Name, email, and an 8-character password are required." }, { status: 400 });
  }

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name, company_name: company || null } },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, needsEmailConfirmation: !data.session });
}