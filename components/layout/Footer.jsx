"use client";

import Link from "next/link";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-divider pt-10" />
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground">Designed &amp; Built</span> by{" "}
            <span className="text-foreground">M Talha Manzoor</span> · {year}
          </div>

          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.id}
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(l.id);
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

