import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import type { HeroContent, ProfileContent } from "@/types/portfolio";

export default function HeroSection({ hero, profile }: { hero: HeroContent; profile: ProfileContent }) {
  return (
    <section className="border-b border-slate-200 bg-white pt-16">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="section-kicker">{hero.kicker}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              {hero.primaryCta}
              <ArrowRight size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100"
            >
              <Mail size={18} />
              {hero.secondaryCta}
            </a>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-slate-200 pt-8">
            {hero.stats.map(({ value, label }) => (
              <div key={label}>
                <dt className="text-2xl font-semibold text-slate-950">{value}</dt>
                <dd className="mt-1 text-sm text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            width={900}
            height={1100}
            priority
            className="aspect-[4/5] h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
