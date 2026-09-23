insert into public.services (name, slug, category, short_description, description, starting_price, delivery_time, published, featured, sort_order)
values
  ('Left Chest Digitizing', 'left-chest-digitizing', 'embroidery', 'Clean, production-ready left chest files.', 'Manual digitizing for shirts, polos, uniforms, and jackets.', 15, '24 hours', true, true, 1),
  ('Cap / Hat Digitizing', 'cap-hat-digitizing', 'embroidery', 'Curved cap files that sew out cleanly.', 'Specialized underlay and stitch direction for front panels and side placements.', 20, '24 hours', true, true, 2),
  ('3D Puff Embroidery', '3d-puff-embroidery', 'embroidery', 'Bold raised lettering and logos.', 'Foam-backed 3D puff digitizing for caps, hats, and premium apparel.', 25, '24 hours', true, true, 3),
  ('Full Back Digitizing', 'full-back-digitizing', 'embroidery', 'Large artwork built for reliable sew-out.', 'Detailed full-back and jacket designs with controlled stitch density.', 65, '48 hours', true, false, 4),
  ('Patch Digitizing', 'patch-digitizing', 'embroidery', 'Crisp borders, fills, and backing-ready files.', 'Custom patch digitizing for uniforms, clubs, brands, and merchandise.', 20, '24 hours', true, false, 5),
  ('Vector Art Conversion', 'vector-art-conversion', 'vector', 'Scalable artwork for print and production.', 'Convert raster logos and illustrations into clean vector artwork.', 15, '24 hours', true, true, 6),
  ('Vector Art', 'vector-art', 'vector', 'Polished vector artwork for every channel.', 'Professional vector design for print, vinyl, laser, and digital use.', 20, '48 hours', true, false, 7),
  ('Custom Graphic Design', 'custom-graphic-design', 'design', 'Original graphics shaped around your brand.', 'Custom logo, merchandise, campaign, and marketing design support.', 35, '2-3 days', true, false, 8)
on conflict (slug) do update set name = excluded.name, category = excluded.category, short_description = excluded.short_description, description = excluded.description, starting_price = excluded.starting_price, delivery_time = excluded.delivery_time;

insert into public.pricing_plans (service_id, name, price, description, delivery_time, revisions, active, featured, sort_order)
select s.id, p.name, p.price, p.description, p.delivery_time, p.revisions, true, p.featured, p.sort_order
from public.services s
join (values
  ('left-chest-digitizing', 'Left Chest', 15::numeric, 'Artwork ready for embroidery', '24 hours', 2, false, 1),
  ('cap-hat-digitizing', 'Left Chest + Cap', 20::numeric, 'Artwork ready for embroidery', '24 hours', 2, true, 2),
  ('3d-puff-embroidery', '3D Puff', 25::numeric, 'Foam puff technique', '24 hours', 2, false, 3),
  ('full-back-digitizing', 'Full Back', 65::numeric, 'Large scale designs', '48 hours', 2, false, 4),
  ('vector-art-conversion', 'Simple Vector', 15::numeric, 'Clean line art conversion', '24 hours', 2, false, 5),
  ('vector-art', 'Complex Vector', 20::numeric, 'Detailed multi-color art', '48 hours', 2, true, 6)
) as p(slug, name, price, description, delivery_time, revisions, featured, sort_order) on s.slug = p.slug
where not exists (select 1 from public.pricing_plans existing where existing.name = p.name);
