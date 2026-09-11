import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const fullName = process.env.ADMIN_NAME || "Graphics Stitch Admin";

const missing = [
  ["NEXT_PUBLIC_SUPABASE_URL", supabaseUrl],
  ["SUPABASE_SERVICE_ROLE_KEY", serviceRoleKey],
  ["ADMIN_EMAIL", email],
  ["ADMIN_PASSWORD", password],
].filter(([, value]) => !value).map(([name]) => name);

if (missing.length) {
  throw new Error(`Missing ${missing.join(", ")} in .env.local. Add the Supabase service role key and admin credentials, then run npm run seed:admin again.`);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
const schemaCheck = await supabase.from("profiles").select("id").limit(1);
if (schemaCheck.error?.code === "PGRST205") {
  throw new Error("Portal database tables are missing. Apply the SQL migrations in supabase/migrations/ first, then run npm run seed:admin again.");
}
if (schemaCheck.error) throw schemaCheck.error;

const users = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (users.error) throw users.error;
let user = users.data.users.find((candidate) => candidate.email?.toLowerCase() === email);

if (!user) {
  const result = await supabase.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: fullName } });
  if (result.error) throw result.error;
  user = result.data.user;
} else {
  const result = await supabase.auth.admin.updateUserById(user.id, { password, email_confirm: true, user_metadata: { full_name: fullName } });
  if (result.error) throw result.error;
  user = result.data.user;
}

const { error } = await supabase.from("profiles").upsert({ id: user.id, full_name: fullName, role: "admin" }, { onConflict: "id" });
if (error) throw error;

console.log(`Admin account ready: ${email}`);