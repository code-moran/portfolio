"use client";

import { useMemo, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);
  const [compoundFrequency, setCompoundFrequency] = useState(12);

  const result = useMemo(() => {
    const periods = Math.max(0, Math.round(years * compoundFrequency));
    const periodicRate = annualRate / 100 / compoundFrequency;
    const contributionPerPeriod = monthlyContribution * (12 / compoundFrequency);
    let balance = principal;

    for (let period = 0; period < periods; period += 1) {
      balance = balance * (1 + periodicRate) + contributionPerPeriod;
    }

    const totalContributions = principal + contributionPerPeriod * periods;
    const interestEarned = balance - totalContributions;

    return {
      balance,
      totalContributions,
      interestEarned,
    };
  }, [annualRate, compoundFrequency, monthlyContribution, principal, years]);

  return (
    <section className="section-padding">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-950">Inputs</h2>
          <div className="mt-6 space-y-5">
            <NumberField label="Initial amount" value={principal} onChange={setPrincipal} prefix="KSh" />
            <NumberField label="Monthly contribution" value={monthlyContribution} onChange={setMonthlyContribution} prefix="KSh" />
            <NumberField label="Annual interest rate" value={annualRate} onChange={setAnnualRate} suffix="%" step={0.1} />
            <NumberField label="Investment period" value={years} onChange={setYears} suffix="years" step={0.5} />
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Compounding frequency</span>
              <select
                value={compoundFrequency}
                onChange={(event) => setCompoundFrequency(Number(event.target.value))}
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-950"
              >
                <option value={1}>Annually</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
                <option value={365}>Daily</option>
              </select>
            </label>
          </div>
        </div>

        <div className="panel p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-950">Projection</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Metric label="Future value" value={currencyFormatter.format(result.balance)} emphasis />
            <Metric label="Total invested" value={currencyFormatter.format(result.totalContributions)} />
            <Metric label="Interest earned" value={currencyFormatter.format(result.interestEarned)} />
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-950">Assumptions</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Contributions are added at the end of each compounding period. This is an estimate before taxes, fees, inflation, and changes in rate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-2 flex rounded-md border border-slate-300 bg-white focus-within:border-slate-950">
        {prefix && <span className="flex items-center border-r border-slate-200 px-3 text-sm text-slate-500">{prefix}</span>}
        <input
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 rounded-md px-3 py-2 text-sm text-slate-950 outline-none"
        />
        {suffix && <span className="flex items-center border-l border-slate-200 px-3 text-sm text-slate-500">{suffix}</span>}
      </div>
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
