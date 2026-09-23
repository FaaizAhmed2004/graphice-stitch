import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.");

const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

async function ensureBy(table, lookup, payload) {
  const { data: existing, error: findError } = await db.from(table).select("id").match(lookup).maybeSingle();
  if (findError) throw findError;
  if (existing) {
    const { data, error } = await db.from(table).update(payload).eq("id", existing.id).select().single();
    if (error) throw error;
    return data;
  }
  const { data, error } = await db.from(table).insert(payload).select().single();
  if (error) throw error;
  return data;
}

async function seedServices() {
  const services = [
    ["Left Chest Digitizing", "left-chest-digitizing", "embroidery", "Clean, production-ready left chest files.", "Manual digitizing for shirts, polos, uniforms, and jackets.", 15, "24 hours", true],
    ["Cap / Hat Digitizing", "cap-hat-digitizing", "embroidery", "Curved cap files that sew out cleanly.", "Specialized underlay and stitch direction for front panels and side placements.", 20, "24 hours", true],
    ["3D Puff Embroidery", "3d-puff-embroidery", "embroidery", "Bold raised lettering and logos.", "Foam-backed 3D puff digitizing for caps, hats, and premium apparel.", 25, "24 hours", true],
    ["Full Back Digitizing", "full-back-digitizing", "embroidery", "Large artwork built for reliable sew-out.", "Detailed full-back and jacket designs with controlled stitch density.", 65, "48 hours", false],
    ["Patch Digitizing", "patch-digitizing", "embroidery", "Crisp borders, fills, and backing-ready files.", "Custom patch digitizing for uniforms, clubs, brands, and merchandise.", 20, "24 hours", false],
    ["Vector Art Conversion", "vector-art-conversion", "vector", "Scalable artwork for print and production.", "Convert raster logos and illustrations into clean vector artwork.", 15, "24 hours", true],
    ["Vector Art", "vector-art", "vector", "Polished vector artwork for every channel.", "Professional vector design for print, vinyl, laser, and digital use.", 20, "48 hours", false],
    ["Custom Graphic Design", "custom-graphic-design", "design", "Original graphics shaped around your brand.", "Custom logo, merchandise, campaign, and marketing design support.", 35, "2-3 days", false],
  ];
  for (const [name, slug, category, short_description, description, starting_price, delivery_time, featured] of services) {
    await ensureBy("services", { slug }, { name, slug, category, short_description, description, starting_price, delivery_time, featured, published: true });
  }
}

async function seedPublicContent() {
  const posts = [
    ["Can AI Artwork Be Used for Embroidery?", "can-ai-artwork-be-used-for-embroidery", "AI artwork can be a strong starting point, but production embroidery needs intentional simplification, stitch planning, and testing.", "AI can generate artwork quickly, but digitizing requires production-ready decisions. Learn what to adjust before sending a design to embroidery.", "Digitizing Tips"],
    ["3D Puff Embroidery 101", "3d-puff-embroidery-101", "A practical guide to foam, density, lettering, and cap-friendly 3D puff designs.", "3D puff adds depth and presence to caps and apparel. Here is how to plan artwork that sews cleanly and looks bold.", "Techniques"],
    ["Machine Embroidery File Formats Explained", "machine-embroidery-file-formats", "DST, PES, EMB, HUS, and more: choose the right format for your machine.", "Every embroidery machine has a preferred language. This guide explains the most common file formats and when to use them.", "File Formats"],
    ["Embroidery Underlay: Why It Matters", "embroidery-underlay-guide", "Good underlay supports clean edges, stable fabric, and a professional finished result.", "Underlay is easy to overlook, but it controls how the design sits on fabric. Learn the main underlay patterns and their purpose.", "Digitizing Tips"],
    ["How to Prepare Artwork for Vector Conversion", "prepare-artwork-for-vector-conversion", "A few simple preparation steps can make vector conversion faster and more accurate.", "Learn which source files, colors, and references help a designer create clean scalable artwork.", "Vector Art"],
  ];
  for (const [title, slug, excerpt, content, category] of posts) await ensureBy("blog_posts", { slug }, { title, slug, excerpt, content, category, status: "published", published_at: new Date().toISOString(), meta_title: title, meta_description: excerpt });

  const portfolio = [
    ["Company Logo - Left Chest", "A clean corporate mark digitized for polos and uniforms.", "Embroidery"],
    ["Sports Team Cap Design", "Raised lettering planned for a structured cap front.", "3D Puff"],
    ["Eagle Vector Conversion", "Detailed raster artwork rebuilt as a scalable vector.", "Vector"],
    ["Floral Patch Design", "Balanced borders and fills for a durable custom patch.", "Patch"],
    ["Brand Full Back Jacket", "Large artwork with controlled density and clear detail.", "Embroidery"],
  ];
  for (const [title, description, category] of portfolio) await ensureBy("portfolio_items", { title }, { title, description, category, published: true, featured: category === "Embroidery" });

  const testimonials = [
    ["Kate Collins", "Apparel Studio", "Owner", "The file sewed out perfectly on the first sample. Fast, thoughtful, and genuinely production-minded.", 5],
    ["Donna M.", "Northline Merch", "Production Manager", "The revisions were handled quickly and the final artwork was exactly what our team needed.", 5],
    ["Jeanne Brown", "Brown Thread Co.", "Founder", "It is easy to communicate with the digitizer and the turnaround is consistently reliable.", 5],
    ["Tanya Martinez", "Team Supply", "Brand Lead", "Graphics Stitch gives us polished files that our embroidery team can use immediately.", 5],
    ["Rich M.", "Independent Designer", "Creative Director", "Clear communication, clean output, and no surprises in production.", 5],
  ];
  for (const [client_name, company, position, testimonial, rating] of testimonials) await ensureBy("testimonials", { client_name }, { client_name, company, position, testimonial, rating, published: true, featured: true });

  const faqs = [
    ["What file formats do you deliver?", "Embroidery files can be delivered in DST, PES, EMB, HUS, VIP, VP3, JEF, EXP, and other machine formats. Vector projects can include AI, EPS, SVG, PDF, and PNG.", "General"],
    ["How fast is the turnaround?", "Most standard designs are delivered within 24 hours. Larger or more detailed projects may need 48 hours or a custom schedule.", "Turnaround"],
    ["Can you digitize custom patches?", "Yes. We plan borders, fills, backing, and stitch direction for patches used on uniforms, clubs, brands, and merchandise.", "Services"],
    ["Can I request revisions?", "Yes. Your portal keeps the brief, proof, messages, and revision requests together so the production history stays clear.", "Orders"],
    ["What artwork can I send?", "PNG, JPG, PDF, SVG, AI, EPS, PSD, CDR, and ZIP files are supported for quote requests.", "Files"],
    ["Do you support business teams?", "Yes. Company profiles, member roles, shared orders, invoices, and billing workflows are supported for larger clients.", "Business"],
    ["How do I approve a proof?", "When a proof is ready, open the order in your dashboard and choose Approve proof or Request revision with your notes.", "Orders"],
    ["Can I pay manually?", "Admins can issue invoices and record bank transfer or manual payments. Payment-provider integrations can be added later.", "Billing"],
    ["Do you offer vector art?", "Yes. We convert raster logos and create clean scalable artwork for print, vinyl, laser, and digital production.", "Services"],
    ["How do I start a project?", "Create an account, submit a quote with your artwork, and follow the quote and order status entirely inside the portal.", "Getting Started"],
  ];
  for (const [question, answer, category] of faqs) await ensureBy("faqs", { question }, { question, answer, category, published: true });
}

async function seedCms() {
  const pages = [
    ["home", "Graphics Stitch - Professional Design Production", "A production-minded design studio for embroidery digitizing, vector art, and custom graphics.", "Professional digitizing and vector production with clear communication, fast turnaround, and files ready for real-world use."],
    ["about", "About Graphics Stitch", "Meet the design production team behind Graphics Stitch.", "We combine design judgment with production knowledge to create artwork that looks sharp and works on the machine, garment, and channel it was made for."],
    ["contact", "Contact Graphics Stitch", "Start a conversation with our design team.", "Share your artwork, deadline, and production needs. We will guide you to the right service and next step."],
    ["pricing", "Graphics Stitch Pricing", "Transparent pricing for embroidery digitizing and vector art.", "Straightforward starting rates for common services, with custom quotes for complex artwork and larger business workflows."],
  ];
  for (const [slug, title, meta_title, meta_description] of pages) {
    const page = await ensureBy("cms_pages", { slug }, { slug, title, content: { body: "" }, published: true, meta_title, meta_description });
    const sections = slug === "home" ? [
      ["hero", "Production-ready artwork for the real world", "Embroidery, vector, and custom graphic design", "Send us the idea, artwork, or production problem. We will turn it into a clean file your team can actually use.", "Start a quote", "/quote"],
      ["services_grid", "Services built around your workflow", "", "Choose focused production support for embroidery, vector, patches, caps, and custom brand graphics.", "Explore services", "/embroidery-digitizing"],
      ["statistics", "A steady production partner", "", "Fast response, practical recommendations, and careful file preparation from brief to final delivery.", "", ""],
      ["portfolio_grid", "See the work in context", "", "Browse examples of embroidery, patch, cap, and vector production.", "View samples", "/sample-designs"],
      ["faq", "Questions before you start?", "", "Find quick answers about files, timing, revisions, and business accounts.", "Read FAQs", "/contact"],
      ["cta", "Have a design ready?", "", "Upload your artwork and get a clear next step from the studio.", "Request a quote", "/quote"],
    ] : [["text", title, "", meta_description, "", ""]];
    for (let index = 0; index < sections.length; index++) {
      const [section_type, sectionTitle, subtitle, description, button_text, button_url] = sections[index];
      await ensureBy("page_sections", { page_id: page.id, section_type, title: sectionTitle }, { page_id: page.id, section_type, title: sectionTitle, subtitle, description, button_text, button_url, enabled: true, sort_order: index });
    }
  }
}

async function seedNavigationAndSettings() {
  const links = [["Services", "/embroidery-digitizing", "header", 1], ["Pricing", "/pricing", "header", 2], ["Sample Designs", "/sample-designs", "header", 3], ["Blog", "/blog", "header", 4], ["About", "/about", "header", 5], ["Contact", "/contact", "header", 6]];
  for (const [label, url, location, sort_order] of links) await ensureBy("navigation_items", { label, url, location }, { label, url, location, sort_order, visible: true, open_new_tab: false });
  const settings = [
    ["brand", { site_name: "Graphics Stitch", tagline: "Professional Embroidery Digitizing & Vector Art", primary_color: "#171717", accent_color: "#d9ff53" }],
    ["contact", { email: "info@graphicsstitch.com", phone: "+1 (800) 123-4567", whatsapp: "+923001234567", hours: "Monday-Friday 9:00am-6:00pm PKT" }],
    ["social", { instagram: "", facebook: "", linkedin: "" }],
  ];
  for (const [setting_key, value] of settings) await ensureBy("site_settings", { setting_key }, { setting_key, value });
}

await seedServices();
await seedPublicContent();
await seedCms();
await seedNavigationAndSettings();
console.log("Website content seed complete: services, pricing, blog, portfolio, testimonials, FAQs, CMS pages, sections, navigation, and settings.");
