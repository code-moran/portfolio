import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/utilities/CompoundInterestCalculator";
import UtilityShell from "@/components/utilities/UtilityShell";

export const metadata: Metadata = {
  title: "Compound Interest Calculator",
  description: "Project savings and investment growth using compound interest, recurring contributions, and custom compounding frequency.",
  alternates: {
    canonical: "/utilities/compound-interest-calculator",
  },
};

export default function CompoundInterestCalculatorPage() {
  return (
    <UtilityShell
      kicker="Finance Utility"
      title="Compound interest calculator"
      description="Forecast how an initial amount and recurring contributions may grow over time with compounding."
    >
      <CompoundInterestCalculator />
    </UtilityShell>
  );
}
