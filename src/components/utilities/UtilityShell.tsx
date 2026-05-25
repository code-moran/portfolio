import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getPortfolioContent } from "@/lib/portfolio-content";

export default async function UtilityShell({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const content = await getPortfolioContent();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation profile={content.profile} />
      <section className="border-b border-slate-200 bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/utilities" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
            Utilities
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">{kicker}</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{description}</p>
        </div>
      </section>
      {children}
      <Footer profile={content.profile} footer={content.footer} />
    </main>
  );
}
