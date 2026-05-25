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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/utilities" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
            Utilities
          </Link>
          <p className="section-kicker mt-6">{kicker}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
        </div>
      </section>
      {children}
      <Footer profile={content.profile} footer={content.footer} />
    </main>
  );
}
