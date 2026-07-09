"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Enter your email address"
        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
      />
      <button
        type="submit"
        className="bg-white text-purple-700 font-bold px-5 py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
