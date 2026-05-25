"use client";

import { useMemo, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

const personalRelief = 2400;
const insuranceReliefCap = 5000;
const nssfRate = 0.06;
const nssfLowerEarningsLimit = 9000;
const nssfUpperEarningsLimit = 108000;
const pensionReliefCap = 30000;

const payeBands = [
  { limit: 24000, rate: 0.1 },
  { limit: 8333, rate: 0.25 },
  { limit: 467667, rate: 0.3 },
  { limit: 300000, rate: 0.325 },
  { limit: Number.POSITIVE_INFINITY, rate: 0.35 },
];

export default function PayeCalculator() {
  const [grossPay, setGrossPay] = useState(150000);
  const [taxableBenefits, setTaxableBenefits] = useState(0);
  const [voluntaryPensionContribution, setVoluntaryPensionContribution] = useState(0);
  const [mortgageInterest, setMortgageInterest] = useState(0);
  const [insurancePremium, setInsurancePremium] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [includeNssf, setIncludeNssf] = useState(true);
  const [includeShif, setIncludeShif] = useState(true);
  const [includeHousingLevy, setIncludeHousingLevy] = useState(true);

  const result = useMemo(() => {
    const pensionablePay = Math.max(grossPay, 0);
    const nssf = includeNssf ? calculateNssf(pensionablePay) : { tierOne: 0, tierTwo: 0, employeeTotal: 0, employerTotal: 0 };
    const shif = includeShif && grossPay > 0 ? Math.max(300, grossPay * 0.0275) : 0;
    const housingLevy = includeHousingLevy ? grossPay * 0.015 : 0;
    const pensionRelief = Math.min(nssf.employeeTotal + voluntaryPensionContribution, pensionReliefCap);
    const mortgageRelief = Math.min(mortgageInterest, 30000);
    const taxablePay = Math.max(0, grossPay + taxableBenefits - pensionRelief - mortgageRelief - shif - housingLevy);
    const grossTax = calculatePayeBeforeRelief(taxablePay);
    const insuranceRelief = Math.min(insurancePremium * 0.15, insuranceReliefCap);
    const totalRelief = personalRelief + insuranceRelief;
    const paye = Math.max(0, grossTax - totalRelief);
    const statutoryDeductions = shif + housingLevy + nssf.employeeTotal + voluntaryPensionContribution + otherDeductions;
    const netPay = grossPay - statutoryDeductions - paye;

    return {
      nssf,
      pensionablePay,
      shif,
      housingLevy,
      pensionRelief,
      taxablePay,
      grossTax,
      insuranceRelief,
      totalRelief,
      paye,
      statutoryDeductions,
      netPay,
    };
  }, [
    grossPay,
    includeHousingLevy,
    includeNssf,
    includeShif,
    insurancePremium,
    mortgageInterest,
    otherDeductions,
    taxableBenefits,
    voluntaryPensionContribution,
  ]);

  return (
    <section className="section-padding">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-950">Monthly pay details</h2>
          <div className="mt-6 space-y-5">
            <NumberField label="Gross monthly pay" value={grossPay} onChange={setGrossPay} />
            <NumberField label="Taxable benefits" value={taxableBenefits} onChange={setTaxableBenefits} />
            <NumberField label="Voluntary pension contribution" value={voluntaryPensionContribution} onChange={setVoluntaryPensionContribution} />
            <NumberField label="Mortgage interest relief deduction" value={mortgageInterest} onChange={setMortgageInterest} />
            <NumberField label="Insurance premium" value={insurancePremium} onChange={setInsurancePremium} />
            <NumberField label="Other deductions" value={otherDeductions} onChange={setOtherDeductions} />

            <div className="grid gap-3 sm:grid-cols-2">
              <Toggle label="Include NSSF Tier I and II" checked={includeNssf} onChange={setIncludeNssf} />
              <Toggle label="Include SHIF at 2.75% min KSh 300" checked={includeShif} onChange={setIncludeShif} />
              <Toggle label="Include housing levy at 1.5%" checked={includeHousingLevy} onChange={setIncludeHousingLevy} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">Estimated monthly result</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Metric label="Net pay" value={currencyFormatter.format(result.netPay)} emphasis />
              <Metric label="PAYE payable" value={currencyFormatter.format(result.paye)} />
              <Metric label="Taxable pay" value={currencyFormatter.format(result.taxablePay)} />
              <Metric label="Tax before relief" value={currencyFormatter.format(result.grossTax)} />
            </div>
          </div>

          <div className="panel p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">Breakdown</h2>
            <div className="mt-5 divide-y divide-slate-200">
              <Row label="NSSF pensionable pay from gross pay" value={result.pensionablePay} />
              <Row label="NSSF Tier I employee contribution" value={result.nssf.tierOne} />
              <Row label="NSSF Tier II employee contribution" value={result.nssf.tierTwo} />
              <Row label="Total employee NSSF" value={result.nssf.employeeTotal} />
              <Row label="Employer NSSF match" value={result.nssf.employerTotal} />
              <Row label="SHIF deduction" value={result.shif} />
              <Row label="Affordable Housing Levy" value={result.housingLevy} />
              <Row label="Pension relief deduction used for PAYE" value={result.pensionRelief} />
              <Row label="Personal relief" value={personalRelief} />
              <Row label="Insurance relief" value={result.insuranceRelief} />
              <Row label="Total relief" value={result.totalRelief} />
              <Row label="Total deductions before PAYE" value={result.statutoryDeductions} />
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            This estimate derives NSSF pensionable pay from gross pay, then applies Tier I at 6% up to KSh 9,000 and Tier II at 6% from KSh 9,001 to KSh 108,000. Confirm payroll treatment with KRA, NSSF, or a qualified payroll professional before filing or paying tax.
          </div>
        </div>
      </div>
    </section>
  );
}

function calculateNssf(pensionablePay: number) {
  const tierOnePensionablePay = Math.min(Math.max(pensionablePay, 0), nssfLowerEarningsLimit);
  const tierTwoPensionablePay = Math.min(Math.max(pensionablePay - nssfLowerEarningsLimit, 0), nssfUpperEarningsLimit - nssfLowerEarningsLimit);
  const tierOne = tierOnePensionablePay * nssfRate;
  const tierTwo = tierTwoPensionablePay * nssfRate;
  const employeeTotal = tierOne + tierTwo;

  return {
    tierOne,
    tierTwo,
    employeeTotal,
    employerTotal: employeeTotal,
  };
}

function calculatePayeBeforeRelief(taxablePay: number) {
  let remaining = taxablePay;
  let tax = 0;

  for (const band of payeBands) {
    const amount = Math.min(remaining, band.limit);
    tax += amount * band.rate;
    remaining -= amount;

    if (remaining <= 0) {
      break;
    }
  }

  return tax;
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-2 flex rounded-md border border-slate-300 bg-white focus-within:border-slate-950">
        <span className="flex items-center border-r border-slate-200 px-3 text-sm text-slate-500">KSh</span>
        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 rounded-md px-3 py-2 text-sm text-slate-950 outline-none"
        />
      </div>
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
      {label}
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-slate-950" />
    </label>
  );
}

function Metric({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className={`rounded-lg border p-5 ${emphasis ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-950"}`}>
      <p className={`text-sm ${emphasis ? "text-slate-300" : "text-slate-500"}`}>{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-950">{currencyFormatter.format(value)}</span>
    </div>
  );
}
