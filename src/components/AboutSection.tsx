import { Code, Database, Globe, Palette, Smartphone, Zap } from "lucide-react";
import type { AboutContent, SkillGroup } from "@/types/portfolio";

const iconMap: Record<SkillGroup["icon"], typeof Code> = {
  code: Code,
  database: Database,
  globe: Globe,
  palette: Palette,
  smartphone: Smartphone,
  zap: Zap,
};

export default function AboutSection({ about }: { about: AboutContent }) {
  return (
    <section id="about" className="section-padding bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker">{about.kicker}</p>
          <h2 className="section-title">{about.headline}</h2>
          <p className="section-copy">
            {about.body}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-slate-950">{about.workTitle}</h3>
            <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
              {about.workParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="panel p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-slate-950">{about.servicesTitle}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {about.services.map((item) => (
                <div key={item} className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl">
            <p className="section-kicker">{about.skillsKicker}</p>
            <h2 className="section-title">{about.skillsHeadline}</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {about.skills.map((skillGroup) => {
              const Icon = iconMap[skillGroup.icon] ?? Code;

              return (
                <div key={skillGroup.category} className="panel p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md border border-slate-200 bg-slate-50 p-2 text-cyan-700">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-950">{skillGroup.category}</h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span key={skill} className="pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
