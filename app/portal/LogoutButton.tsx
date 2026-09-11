"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  return <button onClick={logout} className="text-sm font-semibold text-gray-500 hover:text-gray-950">Sign out</button>;
}