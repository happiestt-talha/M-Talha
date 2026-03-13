"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, variant = "default" }) {
  const isFeatured = variant === "featured" || project.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      className={cn("group relative h-full", isFeatured && "md:col-span-2")}
    >
      <HoverBorderGradient
        as="div"
        duration={0.85}
        containerClassName={cn(
          "h-full w-full rounded-3xl p-[1px]",
          "bg-black/20"
        )}
        className="rounded-3xl bg-gradient-to-b from-[#111118]/80 to-[#0A0A0F]/70 px-6 py-6"
      >
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {project.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/5 hover:border-[#7B61FF]/35 transition"
                >
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/5 hover:border-[#C9A84C]/35 transition"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#1E1E2E] bg-white/5 px-2.5 py-1 text-xs text-foreground/90"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#1E1E2E] bg-black/20">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes={isFeatured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                priority={Boolean(project.featured)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/70 via-transparent to-transparent opacity-90" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-xl border border-[#1E1E2E] bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-[#C9A84C]/35 hover:shadow-[0_0_26px_rgba(201,168,76,0.10)]"
            >
              View Details <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs font-mono text-muted-foreground">
              {isFeatured ? "FEATURED" : "PROJECT"}
            </span>
          </div>
        </div>
      </HoverBorderGradient>
    </motion.article>
  );
}

