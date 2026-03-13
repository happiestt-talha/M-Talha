"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { certifications } from "@/lib/content";

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="section-divider py-24"
      aria-label="Certifications"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>// certifications</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Proof of continuous growth.
        </motion.h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {certifications.map((c) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="glass gold-violet-border rounded-3xl p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-base font-semibold tracking-tight text-foreground">
                    {c.name}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {c.issuer}
                  </div>
                </div>
                <div className="rounded-full border border-[#1E1E2E] bg-white/5 px-3 py-1 text-xs font-mono text-muted-foreground">
                  {c.year}
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
              <div className="mt-4 text-xs text-muted-foreground">
                Issuer logo placeholder
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

