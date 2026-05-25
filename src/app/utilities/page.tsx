import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Landmark, TrendingUp } from "lucide-react";
import UtilityShell from "@/components/utilities/UtilityShell";

export const metadata: Metadata = {
  title: "Utilities",
  description: "Mini apps and calculators for payroll, finance, and planning.",
  alternates: {
    canonical: "/utilities",
  },
};

const utilities = [
  {
    title: "PAYE Calculator",
    description: "Estimate Kenya monthly PAYE, SHIF, housing levy, reliefs, deductions, and net pay.",
    href: "/utilities/paye-calculator",
    icon: Landmark,
  },
  {
    title: "Compound Interest Calculator",
    description: "Project long-term savings or investment growth with recurring contributions.",
    href: "/utilities/compound-interest-calculator",
    icon: TrendingUp,
  },
];

export default function UtilitiesPage() {
  return (
    <UtilityShell
      kicker="Mini Apps"
      title="Utilities for quick planning and everyday calculations."
      description="A small collection of focused tools for payroll, finance, and product planning. More utilities can be added here over time."
    >
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2">
            {utilities.map(({ title, description, href, icon: Icon }) => (
              <Link key={title} href={href} className="panel block p-4 transition-colors hover:border-slate-300 hover:bg-white">
                <div className="flex items-start gap-3">
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-2 text-cyan-700">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-2 text-slate-500">
                <Calculator size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-950">More tools coming next</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  This hub is ready for additional mini apps such as loan amortization, VAT, currency planning, and project estimators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UtilityShell>
  );
}
