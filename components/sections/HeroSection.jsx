"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { roles, person } from "@/lib/content";

const Sparkles = dynamic(
  () => import("@/components/ui/sparkles").then((m) => m.SparklesCore),
  { ssr: false }
);

function splitWords(text) {
  const words = text.split(" ");
  return words.map((w, i) => ({
    text: i < words.length - 1 ? w + " " : w,
  }));
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="section-divider relative min-h-[100svh] w-full overflow-x-hidden pt-28 md:pt-32"
      aria-label="Hero"
    >
      {/* Background image layer — z-0 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg.png"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40"
          alt=""
          priority
        />
      </div>

      {/* Sparkles + gradient overlay — z-[1] */}
      <div className="absolute inset-0 z-[1]">
        <Sparkles
          background="transparent"
          minSize={0.4}
          maxSize={1.6}
          particleDensity={90}
          particleColor="#F0EEF8"
          speed={1.1}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,97,255,0.14),transparent_55%),radial-gradient(ellipse_at_center,rgba(201,168,76,0.12),transparent_55%)]" />
      </div>

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(201,168,76,0.55)"
      />

      {/* Content layer — z-[2] */}
      {/* ✅ FIX 1: added overflow-hidden here to clip any child overflow */}
      <div className="relative z-[2] mx-auto max-w-6xl overflow-hidden px-4 sm:px-6 lg:overflow-visible lg:px-8">
        {/* ✅ FIX 2: added w-full to the grid wrapper */}
        <div className="relative grid w-full items-center gap-10 lg:grid-cols-12">

          {/* ✅ FIX 3: added min-w-0 — this is the ROOT CAUSE fix.
              Grid children default to min-width:auto which lets them
              expand beyond their track. min-w-0 enforces the boundary. */}
          <div className="min-w-0 lg:col-span-8">
            {/* <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-3 rounded-full border border-[#1E1E2E] bg-white/5 px-4 py-2 text-sm text-foreground/90 backdrop-blur"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Available for opportunities
            </motion.div> */}

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.03, delayChildren: 0.1 },
                },
              }}
              className="mt-6 text-balance text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl"
            >
              {"M Talha Manzoor".split("").map((ch, idx) => (
                <motion.span
                  key={`${ch}-${idx}`}
                  variants={{
                    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="inline-block"
                  style={{
                    background:
                      "linear-gradient(90deg, #F0EEF8 0%, #C9A84C 38%, #7B61FF 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </motion.h1>

            {/* ✅ FIX 4: overflow-hidden on typewriter wrapper */}
            <div className="mt-5" >
              <TypewriterEffectSmooth words={roles.map((r) => ({ text: r }))} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-full text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I engineer scalable web experiences — from pixel-perfect frontends
              to robust full stack architectures.
            </motion.p>

            {/* ✅ FIX 5: buttons container is w-full, both buttons capped at w-full on mobile */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <MovingBorderButton
                as="button"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                containerClassName="h-12 w-full sm:w-[200px]"
                className="h-12 w-full border-[#1E1E2E] bg-[#0A0A0F]/40 text-foreground"
                borderClassName="bg-[radial-gradient(#C9A84C_40%,rgba(123,97,255,0)_70%)] opacity-90"
                aria-label="View my work"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  View My Work <ArrowRight className="h-4 w-4 text-[#C9A84C]" />
                </span>
              </MovingBorderButton>

              {/* ✅ FIX 6: removed duplicate sm:w-auto, kept sm:w-[200px] for symmetry */}
              <button
                type="button"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="h-12 w-full rounded-2xl border border-[#1E1E2E] bg-white/5 px-5 text-sm font-semibold text-foreground transition hover:border-[#7B61FF]/35 hover:shadow-[0_0_26px_rgba(123,97,255,0.12)] sm:w-[200px]"
              >
                Let's Connect
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#1E1E2E] bg-white/5 px-3 py-1 text-xs font-mono text-foreground/80">
                Based in {person.location}
              </span>
              <span className="rounded-full border border-[#1E1E2E] bg-white/5 px-3 py-1 text-xs font-mono text-foreground/80">
                Next.js · React · MERN
              </span>
              <span className="rounded-full border border-[#1E1E2E] bg-white/5 px-3 py-1 text-xs font-mono text-foreground/80">
                UI/UX · Motion
              </span>
            </div>
          </div>

          {/* Floating terminal — hidden on mobile, shown lg+ */}
          <div className="relative lg:col-span-4">
            <div className="pointer-events-none absolute -right-2 top-6 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="glass gold-violet-border w-[320px] rounded-3xl p-5"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <div className="ml-auto text-xs font-mono text-muted-foreground">
                    terminal
                  </div>
                </div>
                <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/85">
                  {`> npm run build
✓ optimized bundles
✓ image pipeline ready
✓ SEO metadata generated

deploy: vercel --prod`}
                </pre>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        style={{ zIndex: 2 }}
        type="button"
        aria-label="Scroll down"
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-[#1E1E2E] bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur hover:text-foreground"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="inline-flex items-center gap-2"
        >
          <ArrowDown className="h-4 w-4 text-[#C9A84C]" />
          Scroll
        </motion.span>
      </motion.button>
    </section>
  );
}