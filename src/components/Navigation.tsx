"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ProfileContent } from "@/types/portfolio";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Utilities", href: "/utilities" },
  { name: "Contact", href: "/#contact" },
];

function useActivePath() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const hashItems = navItems
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => item.href.substring(2));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -40% 0px" },
    );

    hashItems.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/") {
    return activeHash ? `/#${activeHash}` : "/#home";
  }
  return pathname;
}

export default function Navigation({ profile }: { profile: ProfileContent }) {
  const menuId = useId();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const activePath = useActivePath();

  const socialLinks = useMemo(
    () => [
      { icon: Github, href: profile.github, label: "GitHub" },
      { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
      { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
    ],
    [profile],
  );

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const syncBodyScroll = () => {
      document.body.style.overflow = details.open ? "hidden" : "";
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
      }
    };

    details.addEventListener("toggle", syncBodyScroll);
    window.addEventListener("keydown", onKeyDown);
    syncBodyScroll();

    return () => {
      details.removeEventListener("toggle", syncBodyScroll);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] isolate border-b border-slate-200 bg-white md:bg-white/95 md:backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
        <Link
          href="/#home"
          onClick={closeMenu}
          className="min-w-0 flex-1 truncate py-2 text-base font-semibold tracking-normal text-slate-950"
        >
          {profile.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm transition-colors hover:text-slate-950 ${
                  isActive ? "font-semibold text-slate-950" : "font-medium text-slate-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Native details/summary: opens without waiting for React hydration */}
        <details ref={detailsRef} className="group relative md:hidden">
          <summary
            aria-controls={menuId}
            aria-label="Toggle menu"
            className="relative z-[102] flex h-11 w-11 list-none touch-manipulation select-none items-center justify-center rounded-md text-slate-700 marker:content-none active:bg-slate-100 [&::-webkit-details-marker]:hidden"
          >
            <Menu size={22} aria-hidden className="pointer-events-none group-open:hidden" />
            <X size={22} aria-hidden className="pointer-events-none hidden group-open:block" />
          </summary>

          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={closeMenu}
            className="fixed inset-0 z-[100] cursor-default bg-slate-950/30"
          />

          <nav
            id={menuId}
            aria-label="Mobile navigation"
            className="absolute right-0 top-full z-[101] mt-2 w-56 rounded-md border border-slate-200 bg-white p-2 shadow-lg ring-1 ring-black/5"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activePath === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-md px-3 py-2.5 text-sm active:bg-slate-100 ${
                      isActive
                        ? "bg-slate-50 font-semibold text-slate-950"
                        : "font-medium text-slate-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="mt-2 flex gap-2 border-t border-slate-200 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="rounded-md p-2 text-slate-500 active:bg-slate-100"
                >
                  <Icon size={18} className="pointer-events-none" />
                </a>
              ))}
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
