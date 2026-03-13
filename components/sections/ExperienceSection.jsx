"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { experience } from "@/lib/content";

export function ExperienceSection() {
  const data = experience.map((e) => ({
    title: e.company,
    content: (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="glass gold-violet-border rounded-3xl p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-base font-semibold tracking-tight text-foreground">
              <span className="text-[#C9A84C]">{e.company}</span>{" "}
              <span className="text-muted-foreground">·</span> {e.role}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {e.location}
            </div>
          </div>
          <div className="text-xs font-mono text-muted-foreground">{e.range}</div>
        </div>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {e.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#C9A84C]/80 shadow-[0_0_10px_rgba(201,168,76,0.28)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ),
  }));

  return (
    <section
      id="experience"
      className="section-divider py-24"
      aria-label="Experience"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>// experience</SectionLabel>
        <div className="mt-8">
          <Timeline
            data={data}
            title="Experience timeline"
            subtitle="Roles, projects, and milestones — delivered with a product-first mindset."
          />
        </div>
      </div>
    </section>
  );
}

