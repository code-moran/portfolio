import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-950">Page not found</h1>
      <p className="mt-4 text-base leading-7 text-slate-600">
        That URL does not match any page on this site. Head back home or browse the utilities hub.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Back to home
        </Link>
        <Link
          href="/utilities"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
        >
          View utilities
        </Link>
      </div>
    </main>
  );
}
