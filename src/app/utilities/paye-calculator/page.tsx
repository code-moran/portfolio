import type { Metadata } from "next";
import PayeCalculator from "@/components/utilities/PayeCalculator";
import UtilityShell from "@/components/utilities/UtilityShell";
import { buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const pageTitle = "Kenya PAYE Calculator";
const pageDescription =
  "Estimate monthly Kenya PAYE, SHIF, Affordable Housing Levy, NSSF, reliefs, deductions, and take-home pay.";
const pagePath = "/utilities/paye-calculator";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "Kenya PAYE calculator",
    "PAYE Kenya",
    "SHIF calculator",
    "housing levy",
    "net pay Kenya",
  ],
});

export default function PayeCalculatorPage() {
  const jsonLd = buildWebApplicationJsonLd({
    name: pageTitle,
    description: pageDescription,
    path: pagePath,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UtilityShell
        kicker="Payroll Utility"
        title="Kenya PAYE calculator"
        description="Estimate monthly PAYE and net pay using Kenya PAYE bands, personal relief, SHIF, and Affordable Housing Levy assumptions."
      >
        <PayeCalculator />
      </UtilityShell>
    </>
  );
}
