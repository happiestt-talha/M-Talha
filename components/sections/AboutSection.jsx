"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { about } from "@/lib/content";

function useCountUp(target, startWhen) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startWhen) return;
    const t = String(target);
    const numeric = Number.parseFloat(t.replace("+", ""));
    if (Number.isNaN(numeric)) return;

    const duration = 900;
    const started = performance.now();
    let raf = 0;

    const tick = (now) => {
      const p = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = numeric * eased;
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, startWhen]);

  const raw = String(target);
  const hasPlus = raw.includes("+");
  const isInt = Number.isInteger(value);

  return `${isInt ? Math.round(value) : value.toFixed(2)}${hasPlus ? "+" : ""}`;
}

function StatCard({ stat, inView }) {
  const display = useCountUp(stat.value, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="glass gold-violet-border rounded-2xl p-5"
    >
      <div className="text-2xl font-bold tracking-tight text-foreground">
        {display}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
    </motion.div>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="about" className="section-divider py-24" aria-label="About">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionLabel>{about.label}</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55 }}
              className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Crafting premium web experiences with a full-stack mindset.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground"
            >
              {about.bio}
            </motion.p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {about.stats.map((s) => (
                <StatCard key={s.label} stat={s} inView={inView} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Headshot photo with gold border & glow */}
              <div className="overflow-hidden rounded-2xl border border-[#C9A84C]/20 shadow-[0_0_40px_rgba(201,168,76,0.15)] transition-transform hover:scale-[1.02]">
                <Image
                  src="/images/headshot.png"
                  width={480}
                  height={480}
                  alt="M Talha Manzoor — Full Stack Developer"
                  className="rounded-2xl object-cover"
                />
              </div>

              {/* Floating tech badges */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {[
                  "Next.js",
                  "React",
                  "Node.js",
                  "MongoDB",
                  "PostgreSQL",
                  "GraphQL",
                  "Tailwind",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#1E1E2E] bg-white/5 px-3 py-1 text-xs text-foreground/90"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.10),transparent_55%)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

