"use client";

import { Calendar, ExternalLink, Github, Tag } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProjectContent, ProjectsSectionContent } from "@/types/portfolio";

export default function ProjectsSection({
  section,
  projects,
}: {
  section: ProjectsSectionContent;
  projects: ProjectContent[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  const featuredProjects = filteredProjects.filter((project) => project.featured);
  const otherProjects = filteredProjects.filter((project) => !project.featured);

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="section-kicker">{section.kicker}</p>
            <h2 className="section-title">{section.headline}</h2>
            <p className="section-copy">{section.body}</p>
          </div>

          <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {featuredProjects.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <article key={project.id} className="panel overflow-hidden">
                <div className="relative h-64 border-b border-slate-200 bg-slate-100">
                  <Image src={project.image ?? "/project3.jpg"} alt={project.title} fill className="object-cover" />
                </div>

                <div className="p-6">
                  <ProjectMeta category={project.category} date={project.date} />
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{project.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{project.description}</p>
                  <ProjectTech technologies={project.technologies} />
                  <ProjectLinks github={project.github} live={project.live} />
                </div>
              </article>
            ))}
          </div>
        )}

        {otherProjects.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <article key={project.id} className="panel p-6">
                <ProjectMeta category={project.category} date={project.date} />
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
                <ProjectTech technologies={project.technologies.slice(0, 4)} />
                <ProjectLinks github={project.github} live={project.live} compact />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectMeta({ category, date }: { category: string; date: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
      <span className="inline-flex items-center gap-2">
        <Tag size={15} />
        {category}
      </span>
      <span className="inline-flex items-center gap-2">
        <Calendar size={15} />
        {date}
      </span>
    </div>
  );
}

function ProjectTech({ technologies }: { technologies: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span key={tech} className="pill">
          {tech}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ github, live, compact = false }: { github: string; live: string; compact?: boolean }) {
  return (
    <div className={`flex gap-3 ${compact ? "mt-5" : "mt-6"}`}>
      <a href={github} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950">
        <Github size={16} />
        Code
      </a>
      <a href={live} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950">
        <ExternalLink size={16} />
        Live
      </a>
    </div>
  );
}
