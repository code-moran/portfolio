"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useCallback, useEffect, useId, useState, useMemo } from "react";
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
      setActiveHash("");
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
      { rootMargin: "-20% 0px -40% 0px" }
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
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const activePath = useActivePath();

  const socialLinks = useMemo(
    () => [
      { icon: Github, href: profile.github, label: "GitHub" },
      { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
      { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
    ],
    [profile]
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] isolate border-b border-slate-200 bg-white md:bg-white/95 md:backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
          <Link
            href="/#home"
            className="min-w-0 flex-1 truncate py-2 text-base font-semibold tracking-normal text-slate-950"
            onClick={closeMenu}
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

          {/* Mobile Dropdown Container */}
          <div className="relative md:hidden">
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls={menuId}
              onClick={toggleMenu}
              className="relative z-[101] flex h-11 w-11 shrink-0 cursor-pointer select-none items-center justify-center rounded-md text-slate-700 active:bg-slate-100"
            >
              {isOpen ? (
                <X size={22} aria-hidden className="pointer-events-none" />
              ) : (
                <Menu size={22} aria-hidden className="pointer-events-none" />
              )}
            </button>

            {/* Backdrop */}
            <div
              className={`fixed inset-0 z-[100] cursor-default bg-slate-950/20 backdrop-blur-sm transition-all duration-200 ease-in-out ${
                isOpen ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"
              }`}
              aria-hidden="true"
              onClick={closeMenu}
            />

            {/* Dropdown Panel */}
            <nav
              id={menuId}
              aria-label="Mobile navigation"
              className={`absolute right-0 top-full z-[101] mt-2 w-56 origin-top-right rounded-md border border-slate-200 bg-white p-2 shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out focus:outline-none ${
                isOpen
                  ? "visible pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "invisible pointer-events-none -translate-y-2 scale-95 opacity-0"
              }`}
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
                        isActive ? "font-semibold text-slate-950 bg-slate-50" : "font-medium text-slate-700"
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
          </div>
        </div>
      </header>
    </>
  );
}
