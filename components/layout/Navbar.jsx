"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import Image from "next/image";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds?.[0] ?? "home");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;

    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = active;
      for (const el of els) {
        const top = el.offsetTop;
        if (top <= y) current = el.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join("|")]);

  return active;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const ids = useMemo(() => NAV.map((n) => n.id), []);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 glass gold-violet-border rounded-2xl px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                aria-label="Go to homepage"
                className="group inline-flex items-center gap-3"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("home");
                }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#C9A84C]/25 bg-[#0A0A0F]/50 shadow-[0_0_18px_rgba(201,168,76,0.18)]">
                  {/* <span className="font-semibold tracking-tight text-[#C9A84C]">
                    TM
                  </span> */}
                  <Image
                    src="/images/talha.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </span>
                <span className="hidden sm:block">
                  <span className="block text-sm font-semibold tracking-tight text-foreground">
                    M Talha Manzoor
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Full-Stack Developer · Lahore
                  </span>
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-2">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-sm text-muted-foreground transition",
                      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/40",
                      active === item.id && "text-foreground"
                    )}
                    aria-current={active === item.id ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={cn(
                        "absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#C9A84C] via-[#7B61FF] to-transparent transition-transform",
                        active === item.id && "scale-x-100",
                        "group-hover:scale-x-100"
                      )}
                    />
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <MovingBorderButton
                  as="a"
                  href="/resume/M_Talha_Manzoor_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  containerClassName="hidden md:block h-11 w-[172px]"
                  className="h-11 w-full border-[#1E1E2E] bg-[#0A0A0F]/40 text-foreground"
                  borderClassName="bg-[radial-gradient(#C9A84C_35%,rgba(123,97,255,0.0)_65%)] opacity-80"
                  aria-label="Download CV"
                >
                  <span className="inline-flex items-center gap-2">
                    <Download className="h-4 w-4 text-[#C9A84C]" />
                    Download CV
                  </span>
                </MovingBorderButton>

                <button
                  type="button"
                  className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/5 text-foreground backdrop-blur-md"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[86vw] max-w-sm glass gold-violet-border p-5 transition-transform",
            open ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold tracking-tight text-foreground">
              Navigation
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/5"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  scrollToId(item.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm",
                  "border border-transparent hover:border-[#1E1E2E] hover:bg-white/5",
                  active === item.id && "border-[#C9A84C]/20 bg-white/5"
                )}
              >
                <span className="text-foreground">{item.label}</span>
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    active === item.id ? "bg-[#C9A84C]" : "bg-[#1E1E2E]"
                  )}
                />
              </button>
            ))}
          </div>

          <a
            href="/resume/M_Talha_Manzoor_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-[#C9A84C]/25 bg-[#0A0A0F]/40 px-4 py-3 text-sm font-medium text-foreground shadow-[0_0_22px_rgba(201,168,76,0.10)]"
          >
            <Download className="h-4 w-4 text-[#C9A84C]" />
            Download CV
          </a>

          <div className="mt-6 text-xs text-muted-foreground">
            Tip: Add your CV at{" "}
            <code className="font-mono text-foreground/90">
              public/resume/M_Talha_Manzoor_CV.pdf
            </code>
          </div>
        </div>
      </div>
    </>
  );
}

