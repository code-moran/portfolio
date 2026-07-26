import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/utilities/CompoundInterestCalculator";
import UtilityShell from "@/components/utilities/UtilityShell";
import { buildPageMetadata, buildWebApplicationJsonLd } from "@/lib/seo";

const pageTitle = "Compound Interest Calculator";
const pageDescription =
  "Project savings and investment growth using compound interest, recurring contributions, and custom compounding frequency.";
const pagePath = "/utilities/compound-interest-calculator";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "compound interest calculator",
    "investment growth calculator",
    "savings projection",
    "recurring contributions",
  ],
});

export default function CompoundInterestCalculatorPage() {
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
        kicker="Finance Utility"
        title="Compound interest calculator"
        description="Forecast how an initial amount and recurring contributions may grow over time with compounding."
      >
        <CompoundInterestCalculator />
      </UtilityShell>
    </>
  );
}
