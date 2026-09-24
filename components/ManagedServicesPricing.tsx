import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type Props = {
  category?: string;
  slugs?: string[];
  title?: string;
  description?: string;
  limit?: number;
};

type Service = {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description: string | null;
  description: string | null;
  starting_price: number | null;
  delivery_time: string | null;
};

type Plan = {
  id: string;
  service_id: string | null;
  name: string;
  price: number;
  currency: string;
  description: string | null;
  delivery_time: string | null;
  revisions: number | null;
  featured: boolean;
};

function formatPrice(price: number | null, currency = "USD") {
  if (price === null) return "Custom quote";
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(price);
}

export default async function ManagedServicesPricing({ category, slugs, title = "Our Services", description = "Choose a service, review the details, and place your order when you are ready.", limit }: Props) {
  const supabase = await getSupabaseServerClient();
  const [{ data: serviceRows }, { data: planRows }] = await Promise.all([
    supabase.from("services").select("id, name, slug, category, short_description, description, starting_price, delivery_time").eq("published", true).order("sort_order"),
    supabase.from("pricing_plans").select("id, service_id, name, price, currency, description, delivery_time, revisions, featured").eq("active", true).order("sort_order"),
  ]);

  const services = ((serviceRows || []) as Service[]).filter((service) => (!category || service.category === category) && (!slugs || slugs.includes(service.slug))).slice(0, limit);
  const plans = (planRows || []) as Plan[];
  if (!services.length) return null;

  return (
    <section className="bg-[#f3f2ee] py-20 dark:bg-[#171717]" id="managed-services-pricing">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#587500] dark:text-[#d9ff53]">Simple, clear pricing</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#171717] dark:text-white sm:text-5xl">{title}</h2>
          <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/55">{description}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const displayedPlans = plans.filter((plan) => plan.service_id === service.id).slice(0, 3);
            const orderUrl = `/portal/login?next=${encodeURIComponent(`/quote?service=${service.slug}`)}`;
            return (
              <article key={service.id} className="flex min-h-80 flex-col rounded-2xl border border-black/15 bg-[#f8f9fa] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#6f9700] hover:shadow-xl dark:border-white/10 dark:bg-[#222]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black text-[#171717] dark:text-white">{service.name}</h3>
                  <span className="shrink-0 rounded-full bg-[#d9ff53] px-3 py-1 text-xs font-black text-[#171717]">{formatPrice(service.starting_price)}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60">{service.short_description || service.description || "Professional production-ready service tailored to your project."}</p>
                {service.delivery_time && <p className="mt-4 text-xs font-bold uppercase tracking-wider text-black/40 dark:text-white/40">Delivery: {service.delivery_time}</p>}
                {displayedPlans.length > 0 && <div className="mt-5 space-y-2 border-t border-black/10 pt-4 dark:border-white/10">{displayedPlans.map((plan) => <div key={plan.id} className="flex items-center justify-between gap-3 text-sm"><span className="flex items-center gap-2 font-bold text-black/70 dark:text-white/70"><Check className="h-3.5 w-3.5 text-[#2dc43b]" />{plan.name}</span><span className="font-black text-[#171717] dark:text-white">{formatPrice(plan.price, plan.currency)}</span></div>)}</div>}
                <Link href={orderUrl} className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-[#2dc43b] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#239e2f]">Place Order <ArrowUpRight className="h-3.5 w-3.5" /></Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}