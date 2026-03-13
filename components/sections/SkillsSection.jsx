"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { SkillBadge } from "@/components/shared/SkillBadge";
import { skills } from "@/lib/content";

export function SkillsSection() {
  return (
    <section id="skills" className="section-divider py-24" aria-label="Skills">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>// tech stack</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Tools I use to ship production-grade products.
        </motion.h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="glass gold-violet-border rounded-3xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold tracking-tight text-foreground">
                  {group.title}
                </div>
                <div className="h-px w-10 bg-gradient-to-r from-[#C9A84C]/40 to-[#7B61FF]/25" />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <SkillBadge key={s}>{s}</SkillBadge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

