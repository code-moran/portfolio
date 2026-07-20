"use client";

import Link from "next/link";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import type { ProfileContent } from "@/types/portfolio";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Utilities", href: "/utilities" },
  { name: "Contact", href: "/#contact" },
];

export default function Navigation({ profile }: { profile: ProfileContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  const socialLinks = [
    { icon: Github, href: profile.github, label: "GitHub" },
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  ];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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

  const mobileMenu = (
    <>
      <button
        type="button"
        aria-label="Close menu"
        onClick={closeMenu}
        className={`fixed inset-x-0 bottom-0 top-16 z-[9998] bg-slate-950/40 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      />
      <nav
        id={menuId}
        aria-label="Mobile navigation"
        className={`fixed inset-x-0 top-16 z-[9999] max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white shadow-lg md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className="rounded-md px-3 py-3 text-sm font-medium text-slate-700 active:bg-slate-100"
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-slate-200 pt-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="rounded-md p-3 text-slate-500 active:bg-slate-100"
              >
                <Icon size={18} className="pointer-events-none" />
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] isolate border-b border-slate-200 bg-white md:bg-white/95 md:backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
          <Link
            href="/#home"
            className="min-w-0 flex-1 truncate py-2 text-base font-semibold tracking-normal text-slate-950"
          >
            {profile.name}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
              >
                {item.name}
              </Link>
            ))}
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

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls={menuId}
            onClick={toggleMenu}
            className="relative z-[101] flex h-11 w-11 shrink-0 cursor-pointer select-none items-center justify-center rounded-md text-slate-700 active:bg-slate-100 md:hidden"
          >
            {isOpen ? (
              <X size={22} aria-hidden className="pointer-events-none" />
            ) : (
              <Menu size={22} aria-hidden className="pointer-events-none" />
            )}
          </button>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
