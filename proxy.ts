import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return response;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const isPortalLogin = request.nextUrl.pathname === "/portal/login";
  const isAdminLogin = request.nextUrl.pathname === "/admin/login";
  const isProtectedPath = request.nextUrl.pathname.startsWith("/portal") || request.nextUrl.pathname.startsWith("/admin");
  if (!user && isProtectedPath && !isPortalLogin && !isAdminLogin) {
    return NextResponse.redirect(new URL(request.nextUrl.pathname.startsWith("/admin") ? "/admin/login" : "/portal/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};