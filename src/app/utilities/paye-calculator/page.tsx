import type { Metadata } from "next";
import PayeCalculator from "@/components/utilities/PayeCalculator";
import UtilityShell from "@/components/utilities/UtilityShell";

export const metadata: Metadata = {
  title: "Kenya PAYE Calculator",
  description: "Estimate monthly Kenya PAYE, SHIF, Affordable Housing Levy, reliefs, deductions, and net pay.",
  alternates: {
    canonical: "/utilities/paye-calculator",
  },
};

export default function PayeCalculatorPage() {
  return (
    <UtilityShell
      kicker="Payroll Utility"
      title="Kenya PAYE calculator"
      description="Estimate monthly PAYE and net pay using Kenya PAYE bands, personal relief, SHIF, and Affordable Housing Levy assumptions."
    >
      <PayeCalculator />
    </UtilityShell>
  );
}
