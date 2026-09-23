import type { MetadataRoute } from "next";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes = ["", "/embroidery-digitizing", "/patch-digitizing", "/vector-art", "/pricing", "/sample-designs", "/blog", "/about", "/contact", "/quote"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() }));
  try {
    const supabase = await getSupabaseServerClient();
    const [{ data: services }, { data: posts }, { data: portfolio }] = await Promise.all([
      supabase.from("services").select("slug, updated_at").eq("published", true),
      supabase.from("blog_posts").select("slug, updated_at").eq("status", "published"),
      supabase.from("portfolio_items").select("id, updated_at").eq("published", true),
    ]);
    return [...staticRoutes, ...(services || []).map((item) => ({ url: `${baseUrl}/services/${item.slug}`, lastModified: item.updated_at })), ...(posts || []).map((item) => ({ url: `${baseUrl}/blog/${item.slug}`, lastModified: item.updated_at })), ...(portfolio || []).map((item) => ({ url: `${baseUrl}/sample-designs#${item.id}`, lastModified: item.updated_at }))];
  } catch { return staticRoutes; }
}
