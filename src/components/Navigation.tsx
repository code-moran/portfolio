"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { ProfileContent } from "@/types/portfolio";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Utilities", href: "/utilities" },
  { name: "Contact", href: "/#contact" },
];

function resolveMobileHref(href: string, pathname: string) {
  // Same-page section links use native hash anchors so scroll + close stay reliable.
  if (pathname === "/" && href.startsWith("/#")) {
    return href.slice(1);
  }
  return href;
}

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
  const pathname = usePathname();
  const toggleId = useId();
  const menuId = useId();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const activePath = useActivePath();

  const socialLinks = useMemo(
    () => [
      { icon: Github, href: profile.github, label: "GitHub" },
      { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
      { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
    ],
    [profile],
  );

  const closeMenu = useCallback(() => {
    const checkbox = checkboxRef.current;
    if (checkbox) {
      checkbox.checked = false;
    }
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const checkbox = checkboxRef.current;
    if (!checkbox) return;

    const onChange = () => {
      const open = checkbox.checked;
      setIsOpen(open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && checkbox.checked) {
        closeMenu();
      }
    };

    checkbox.addEventListener("change", onChange);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      checkbox.removeEventListener("change", onChange);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeMenu]);

  // Close when any link inside the mobile sheet is activated (capture beats Next.js routing quirks).
  useEffect(() => {
    const nav = document.getElementById(menuId);
    if (!nav) return;

    const onNavClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("a")) {
        closeMenu();
      }
    };

    nav.addEventListener("click", onNavClick, true);
    window.addEventListener("hashchange", closeMenu);

    return () => {
      nav.removeEventListener("click", onNavClick, true);
      window.removeEventListener("hashchange", closeMenu);
    };
  }, [menuId, closeMenu]);

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

        <div className="relative md:hidden">
          <input
            ref={checkboxRef}
            id={toggleId}
            type="checkbox"
            className="peer sr-only"
            aria-controls={menuId}
            aria-expanded={isOpen}
          />

          <label
            htmlFor={toggleId}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="relative z-[102] flex h-11 w-11 touch-manipulation select-none items-center justify-center rounded-md text-slate-700 outline-none transition-colors active:bg-slate-100 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-700/40 peer-checked:[&_.menu-open]:hidden peer-checked:[&_.menu-close]:block"
          >
            <Menu size={22} aria-hidden className="menu-open pointer-events-none" />
            <X size={22} aria-hidden className="menu-close pointer-events-none hidden" />
          </label>

          <label
            htmlFor={toggleId}
            aria-label="Close menu"
            className="mobile-menu-motion pointer-events-none fixed inset-x-0 bottom-0 top-16 z-[100] cursor-default bg-slate-950/40 opacity-0 transition-opacity duration-200 ease-out peer-checked:pointer-events-auto peer-checked:opacity-100"
          />

          <nav
            id={menuId}
            aria-label="Mobile navigation"
            data-open={isOpen ? "true" : "false"}
            className="mobile-menu-motion pointer-events-none invisible fixed inset-x-0 top-16 z-[101] max-h-[min(32rem,calc(100dvh-4rem))] origin-top -translate-y-2 overflow-y-auto overscroll-contain border-b border-slate-200 bg-white opacity-0 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.35)] transition-[opacity,transform,visibility] duration-200 ease-out peer-checked:pointer-events-auto peer-checked:visible peer-checked:translate-y-0 peer-checked:opacity-100"
          >
            <div className="mx-auto flex max-w-7xl flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
              <p className="px-1 pb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Menu
              </p>

              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activePath === item.href;
                  const href = resolveMobileHref(item.href, pathname);
                  const className = `flex min-h-12 items-center rounded-md px-3 text-base transition-colors active:bg-slate-100 ${
                    isActive
                      ? "bg-slate-50 font-semibold text-slate-950 ring-1 ring-inset ring-slate-200"
                      : "font-medium text-slate-700"
                  }`;

                  return (
                    <li key={item.name}>
                      {href.startsWith("#") ? (
                        <a
                          href={href}
                          onClick={closeMenu}
                          aria-current={isActive ? "page" : undefined}
                          className={className}
                        >
                          <span
                            className={`mr-3 h-5 w-0.5 rounded-full ${
                              isActive ? "bg-cyan-700" : "bg-transparent"
                            }`}
                            aria-hidden
                          />
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          onClick={closeMenu}
                          aria-current={isActive ? "page" : undefined}
                          className={className}
                        >
                          <span
                            className={`mr-3 h-5 w-0.5 rounded-full ${
                              isActive ? "bg-cyan-700" : "bg-transparent"
                            }`}
                            aria-hidden
                          />
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="px-1 pb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Connect
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 text-slate-600 transition-colors active:bg-slate-100 active:text-slate-950"
                    >
                      <Icon size={18} className="pointer-events-none" aria-hidden />
                      <span className="text-[0.6875rem] font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
