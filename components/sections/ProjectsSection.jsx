"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { projects } from "@/lib/content";

export function ProjectsSection() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.slug !== featured?.slug);

  return (
    <section
      id="projects"
      className="section-divider py-24"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>// projects</SectionLabel>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Selected builds — engineered to ship.
          </motion.h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            A curated set of projects that showcase full-stack execution, UI craft,
            and performance-minded architecture.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {featured ? <ProjectCard project={featured} variant="featured" /> : null}
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

