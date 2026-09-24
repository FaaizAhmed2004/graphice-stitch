export const SITE_NAME = "Graphic Stitch";
export const SITE_TAGLINE = "Professional Embroidery Digitizing & Vector Art";
export const WHATSAPP_NUMBER = "923001234567"; // Replace with your WhatsApp number
export const CONTACT_EMAIL = "info@graphicsstitch.co";
export const CONTACT_LOCATION = "California, USA";
export const BUSINESS_HOURS = "Monday–Friday 9:00am–6:00pm PT";

export const NAV_LINKS = [
  { label: "Embroidery Digitizing", href: "/embroidery-digitizing" },
  { label: "Vector Art", href: "/vector-art" },
  { label: "Patch Digitizing", href: "/patch-digitizing" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Designs", href: "/free-designs" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const NAV_LINKS_HOME = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    id: "left-chest",
    title: "Left Chest Digitizing",
    description:
      "Perfect for shirts, polos, and jackets. Our left chest designs are crisp, clean, and sew out perfectly on any fabric.",
    icon: "shirt",
    price: "$15",
    badge: "Most Popular",
  },
  {
    id: "cap-digitizing",
    title: "Cap / Hat Digitizing",
    description:
      "Caps require specialized digitizing techniques. We handle the curve and underlay perfectly for every cap style.",
    icon: "hard-hat",
    price: "$20",
    badge: null,
  },
  {
    id: "3d-puff",
    title: "3D Puff Embroidery",
    description:
      "Add dimension to your designs with foam-backed 3D puff embroidery. Ideal for bold, standout logos on caps and hats.",
    icon: "layers",
    price: "$25",
    badge: "Premium",
  },
  {
    id: "full-back",
    title: "Full Back / Jacket",
    description:
      "Large-scale back designs with intricate detail. We ensure smooth sew-out and minimal thread changes.",
    icon: "maximize",
    price: "$65",
    badge: null,
  },
  {
    id: "vector-art",
    title: "Vector Art Conversion",
    description:
      "Convert raster images into clean, scalable vector files. Perfect for screen printing, vinyl, laser cutting, and digital media.",
    icon: "pen-tool",
    price: "$15",
    badge: null,
  },
  {
    id: "patch",
    title: "Patch Digitizing",
    description:
      "Custom patches with precise borders and fill stitches. Great for uniforms, military, biker clubs, and corporate branding.",
    icon: "shield",
    price: "$20",
    badge: null,
  },
];

export const PRICING_EMBROIDERY = [
  { name: "Left Chest", price: "$15", note: "Artwork ready for embroidery", popular: false },
  { name: "Left Chest + Cap", price: "$20", note: "Artwork ready for embroidery", popular: true },
  { name: "3D Puff", price: "$25", note: "Foam puff technique", popular: false },
  { name: "Full Back", price: "$65", note: "Large scale designs", popular: false },
];

export const PRICING_VECTOR = [
  { name: "Simple Vector", price: "$15", note: "Clean line art conversion", popular: false },
  { name: "Complex Vector", price: "$20", note: "Detailed multi-color art", popular: true },
];

export const FORMATS_EMBROIDERY = "DST, PES, EMB, XXX, HUS, VIP, VP3, NGS and more";
export const FORMATS_VECTOR = "AI, EPS, PDF, SVG, PNG, CDR and more";

export const TESTIMONIALS = [
  {
    name: "Kate Collins",
    source: "Personal Testimonial",
    rating: 5,
    text: "I just finished embroidering the logo they sent — absolutely perfect. The quality and professionalism blew me away. Will be ordering again!",
  },
  {
    name: "Donna M.",
    source: "Facebook Reviews",
    rating: 5,
    text: "They do an amazing job. Had two logos digitized with minor changes — turnaround was fast and the results were spot on.",
  },
  {
    name: "Jeanne Brown",
    source: "Impressions",
    rating: 5,
    text: "Graphics Stitch is fantastic. You can actually talk to the digitizer! Even with a time difference, they respond quickly and professionally.",
  },
  {
    name: "Tanya Martinez",
    source: "Google Reviews",
    rating: 5,
    text: "These people are fantastic — great designs, excellent customer service, fast and professional. They make my work so much easier!",
  },
  {
    name: "Kat Holley",
    source: "Facebook Reviews",
    rating: 5,
    text: "Best digital files I have ever had. Super helpful, turnaround is fast, and the quality is unmatched.",
  },
  {
    name: "Rich M.",
    source: "Personal Testimonial",
    rating: 5,
    text: "I couldn't have asked for better results. The transaction was seamless and I will be a loyal customer from here on.",
  },
];

export const FAQS = [
  {
    question: "Can you digitize custom patches?",
    answer:
      "Yes. We create clean patch files with precise borders, fills, and stitch direction for uniforms, clubs, brands, and custom merchandise.",
  },
  {
    question: "Do you offer same-day turnaround?",
    answer:
      "Yes, we offer same-day rush service for most designs. Standard turnaround is next business day. Contact us to confirm availability.",
  },
  {
    question: "How will I receive my files?",
    answer:
      "Files are delivered via email in your requested format. You can also request multiple formats at no extra charge.",
  },
  {
    question: "What changes are allowed after delivery?",
    answer:
      "We offer free revisions within 14 days of delivery. This includes size adjustments, color changes, and minor design tweaks.",
  },
  {
    question: "What is the normal turnaround time?",
    answer:
      "Standard turnaround is 24 hours (next business day). Rush same-day service is available for most orders.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "We accept JPG, PNG, PDF, AI, EPS, SVG, CDR, and most other image formats. Higher resolution images produce better results.",
  },
];

export const PORTFOLIO_ITEMS = [
  { id: 1, title: "Company Logo — Left Chest", category: "Embroidery", image: "/Left chest TEDDEY.JPG" },
  { id: 2, title: "Sports Team Cap Design", category: "3D Puff", image: "/RAIDERS hat.JPG" },
  { id: 3, title: "Eagle Vector Art", category: "Vector Art", image: "/Dallas Cowboys Vector Art.png" },
  { id: 4, title: "Brand Full Back Jacket", category: "Embroidery", image: "/MARATHON JB sweatshirts.JPG" },
  { id: 5, title: "Floral Patch Design", category: "Patch", image: "/Vintage_Cutting.jpg" },
  { id: 6, title: "Tiger Vector Conversion", category: "Vector Art", image: "/vector.jpg" },
];

export const STATS = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "15+", label: "Years Experience" },
  { value: "24hr", label: "Turnaround Time" },
  { value: "100%", label: "Quality Guarantee" },
];
