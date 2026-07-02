"use client";

import { Save, Upload, AlertCircle, CheckCircle2, Eye } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { PortfolioContent } from "@/types/portfolio";

type Status = "idle" | "loading" | "saving" | "saved" | "error";

export default function AdminPanel() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");
  const [skillsJson, setSkillsJson] = useState("");
  const [projectsJson, setProjectsJson] = useState("");
  const { status: authStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function loadContent() {
      if (authStatus === "loading") {
        return;
      }

      if (authStatus === "unauthenticated") {
        router.replace("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/content", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Could not load content.");
        }

        const nextContent = (await response.json()) as PortfolioContent;
        setContent(nextContent);
        setSkillsJson(JSON.stringify(nextContent.about.skills, null, 2));
        setProjectsJson(JSON.stringify(nextContent.projects, null, 2));
        setStatus("idle");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Could not load content.");
        setStatus("error");
      }
    }

    loadContent();
  }, [authStatus, router]);

  const seoDescriptionCount = content?.site.description.length ?? 0;
  const seoTitleCount = content?.site.title.length ?? 0;
  const seoStatus = useMemo(() => {
    if (!content) {
      return "";
    }

    if (seoTitleCount > 60 || seoDescriptionCount > 160) {
      return "Consider shortening the SEO title or description.";
    }

    return "SEO title and description are in a healthy range.";
  }, [content, seoDescriptionCount, seoTitleCount]);

  function update(path: string, value: string) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      const next = structuredClone(current);
      const keys = path.split(".");
      let target: Record<string, unknown> = next as unknown as Record<string, unknown>;

      keys.slice(0, -1).forEach((key) => {
        target = target[key] as Record<string, unknown>;
      });

      target[keys[keys.length - 1]] = value;
      return next;
    });
  }

  function updateList(path: string, value: string) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      const next = structuredClone(current);
      const list = value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
      const keys = path.split(".");
      let target: Record<string, unknown> = next as unknown as Record<string, unknown>;

      keys.slice(0, -1).forEach((key) => {
        target = target[key] as Record<string, unknown>;
      });

      target[keys[keys.length - 1]] = list;
      return next;
    });
  }

  async function saveContent() {
    if (!content) {
      return;
    }

    setStatus("saving");
    setMessage("");

    try {
      const parsedSkills = JSON.parse(skillsJson);
      const parsedProjects = JSON.parse(projectsJson);
      const payload = {
        ...content,
        about: {
          ...content.about,
          skills: parsedSkills,
        },
        projects: parsedProjects,
      };

      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        throw new Error("Save blocked. Sign in again and retry.");
      }

      if (!response.ok) {
        throw new Error("Save failed. Check the content shape and try again.");
      }

      const result = (await response.json()) as { content: PortfolioContent };
      setContent(result.content);
      setStatus("saved");
      setMessage("Content saved. Refresh the portfolio to see the latest changes.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Save failed.");
    }
  }

  if (!content) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-slate-600">{status === "error" ? message : "Loading content..."}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="section-kicker">Admin</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Content Management</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Edit portfolio copy, SEO fields, profile links, skills, and projects from one place.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <Eye size={16} />
              View site
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Sign out
            </button>
            <button
              type="button"
              onClick={saveContent}
              disabled={status === "saving"}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {status === "saving" ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <aside className="space-y-6">
          <Panel title="SEO Health">
            <div className="space-y-3 text-sm text-slate-600">
              <p>Title: {seoTitleCount}/60 characters</p>
              <p>Description: {seoDescriptionCount}/160 characters</p>
              <p className="font-medium text-slate-800">{seoStatus}</p>
            </div>
          </Panel>

          <Panel title="Save Status">
            <div className="flex items-start gap-3 text-sm text-slate-600">
              {status === "error" ? <AlertCircle className="mt-0.5 text-red-600" size={18} /> : <CheckCircle2 className="mt-0.5 text-cyan-700" size={18} />}
              <p>{message || "No unsaved errors detected."}</p>
            </div>
          </Panel>

          <Panel title="Structured Editors">
            <p className="text-sm leading-6 text-slate-600">
              Skills and projects are JSON so you can reorder, add, or remove items without a complex form getting in the way.
            </p>
          </Panel>
        </aside>

        <div className="space-y-6">
          <Panel title="SEO">
            <Field label="Site URL" value={content.site.url} onChange={(value) => update("site.url", value)} />
            <Field label="SEO title" value={content.site.title} onChange={(value) => update("site.title", value)} />
            <Textarea label="SEO description" value={content.site.description} onChange={(value) => update("site.description", value)} />
            <Textarea label="Keywords, one per line" value={content.site.keywords.join("\n")} onChange={(value) => updateList("site.keywords", value)} />
          </Panel>

          <Panel title="Profile">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" value={content.profile.name} onChange={(value) => update("profile.name", value)} />
              <Field label="Role" value={content.profile.role} onChange={(value) => update("profile.role", value)} />
              <Field label="Email" value={content.profile.email} onChange={(value) => update("profile.email", value)} />
              <Field label="Phone" value={content.profile.phone} onChange={(value) => update("profile.phone", value)} />
              <Field label="Location" value={content.profile.location} onChange={(value) => update("profile.location", value)} />
              <Field label="GitHub" value={content.profile.github} onChange={(value) => update("profile.github", value)} />
              <Field label="LinkedIn" value={content.profile.linkedin} onChange={(value) => update("profile.linkedin", value)} />
            </div>
          </Panel>

          <Panel title="Hero">
            <Field label="Kicker" value={content.hero.kicker} onChange={(value) => update("hero.kicker", value)} />
            <Textarea label="Headline" value={content.hero.headline} onChange={(value) => update("hero.headline", value)} />
            <Textarea label="Body" value={content.hero.body} onChange={(value) => update("hero.body", value)} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Primary CTA" value={content.hero.primaryCta} onChange={(value) => update("hero.primaryCta", value)} />
              <Field label="Secondary CTA" value={content.hero.secondaryCta} onChange={(value) => update("hero.secondaryCta", value)} />
              <Field label="Image path" value={content.hero.image} onChange={(value) => update("hero.image", value)} />
              <Field label="Image alt text" value={content.hero.imageAlt} onChange={(value) => update("hero.imageAlt", value)} />
            </div>
          </Panel>

          <Panel title="About">
            <Field label="Kicker" value={content.about.kicker} onChange={(value) => update("about.kicker", value)} />
            <Textarea label="Headline" value={content.about.headline} onChange={(value) => update("about.headline", value)} />
            <Textarea label="Body" value={content.about.body} onChange={(value) => update("about.body", value)} />
            <Field label="Work title" value={content.about.workTitle} onChange={(value) => update("about.workTitle", value)} />
            <Textarea label="Work paragraphs, one per line" value={content.about.workParagraphs.join("\n")} onChange={(value) => updateList("about.workParagraphs", value)} />
            <Field label="Services title" value={content.about.servicesTitle} onChange={(value) => update("about.servicesTitle", value)} />
            <Textarea label="Services, one per line" value={content.about.services.join("\n")} onChange={(value) => updateList("about.services", value)} />
            <Field label="Skills kicker" value={content.about.skillsKicker} onChange={(value) => update("about.skillsKicker", value)} />
            <Field label="Skills headline" value={content.about.skillsHeadline} onChange={(value) => update("about.skillsHeadline", value)} />
            <JsonEditor label="Skills JSON" value={skillsJson} onChange={setSkillsJson} />
          </Panel>

          <Panel title="Projects">
            <Field label="Kicker" value={content.projectsSection.kicker} onChange={(value) => update("projectsSection.kicker", value)} />
            <Textarea label="Headline" value={content.projectsSection.headline} onChange={(value) => update("projectsSection.headline", value)} />
            <Textarea label="Body" value={content.projectsSection.body} onChange={(value) => update("projectsSection.body", value)} />
            <JsonEditor label="Projects JSON" value={projectsJson} onChange={setProjectsJson} />
          </Panel>

          <Panel title="Contact & Footer">
            <Field label="Contact kicker" value={content.contact.kicker} onChange={(value) => update("contact.kicker", value)} />
            <Textarea label="Contact headline" value={content.contact.headline} onChange={(value) => update("contact.headline", value)} />
            <Textarea label="Contact body" value={content.contact.body} onChange={(value) => update("contact.body", value)} />
            <Textarea label="Footer summary" value={content.footer.summary} onChange={(value) => update("footer.summary", value)} />
            <Field label="Footer copyright" value={content.footer.copyright} onChange={(value) => update("footer.copyright", value)} />
          </Panel>

          <button
            type="button"
            onClick={saveContent}
            disabled={status === "saving"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload size={16} />
            {status === "saving" ? "Saving..." : "Save all content"}
          </button>
        </div>
      </div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-950"
      />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        value={value}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm leading-6 text-slate-950 outline-none focus:border-slate-950"
      />
    </label>
  );
}

function JsonEditor({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        value={value}
        rows={14}
        spellCheck={false}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-slate-300 bg-slate-950 px-3 py-2 font-mono text-xs leading-5 text-slate-50 outline-none focus:border-cyan-600"
      />
    </label>
  );
}
