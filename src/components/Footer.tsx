import { Github, Linkedin, Mail } from "lucide-react";
import type { FooterContent, ProfileContent } from "@/types/portfolio";

export default function Footer({ profile, footer }: { profile: ProfileContent; footer: FooterContent }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">{profile.name}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{footer.summary}</p>
          </div>

          <div className="flex gap-3">
            {[
              { icon: Github, href: profile.github, label: "GitHub" },
              { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">{footer.copyright}</div>
      </div>
    </footer>
  );
}
