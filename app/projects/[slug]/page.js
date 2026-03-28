import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { getNextProjectSlug, getProjectBySlug, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const nextSlug = getNextProjectSlug(project.slug);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mtalha.me',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: project.name,
        item: `https://mtalha.me/projects/${project.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-[100svh] pt-28 md:pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/?section=projects"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#1E1E2E] bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-[#C9A84C]/35 hover:shadow-[0_0_26px_rgba(201,168,76,0.10)]"
        >
          <ArrowLeft className="h-4 w-4 text-[#C9A84C]" />
          Back to Projects
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[#1E1E2E] bg-black/20">
          <div className="relative aspect-[21/9] w-full">
            {project.image ? <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            /> : project.video && <video
              src={project.video}
              autoPlay
              loop
              muted
              className="object-cover"
              sizes="100vw"
              priority
            />
            }
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,97,255,0.18),transparent_55%),linear-gradient(to_top,rgba(10,10,15,0.75),transparent)]" />
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {project.overview}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#1E1E2E] bg-white/5 px-3 py-1 text-xs text-foreground/90"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-6">
              <section className="glass gold-violet-border rounded-3xl p-6">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Key features
                </h2>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#7B61FF]/85 shadow-[0_0_10px_rgba(123,97,255,0.4)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="glass gold-violet-border rounded-3xl p-6">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Challenges &amp; solutions
                </h2>
                <div className="mt-4 space-y-4">
                  {project.challenges.map((c, idx) => (
                    <article key={idx} className="rounded-2xl border border-[#1E1E2E] bg-white/5 p-5">
                      <div className="text-sm font-semibold text-foreground">
                        {c.problem}
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {c.solution}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="glass gold-violet-border rounded-3xl p-6">
              <div className="text-sm font-semibold tracking-tight text-foreground">
                Links
              </div>
              <div className="mt-4 grid gap-3">
                <a
                  href={project.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!project.github}
                  className="inline-flex items-center justify-between rounded-2xl border border-[#1E1E2E] bg-white/5 px-4 py-3 text-sm text-foreground transition hover:border-[#7B61FF]/35 disabled:pointer-events-none disabled:opacity-50"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4 text-[#7B61FF]" /> GitHub
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
                <a
                  href={project.live || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!project.live}
                  className="inline-flex items-center justify-between rounded-2xl border border-[#1E1E2E] bg-white/5 px-4 py-3 text-sm text-foreground transition hover:border-[#C9A84C]/35 disabled:pointer-events-none disabled:opacity-50"
                >
                  <span className="inline-flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-[#C9A84C]" /> Live demo
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>
              {/* <p className="mt-4 text-xs text-muted-foreground">
                Add real links in <code className="font-mono">lib/content.js</code>.
              </p> */}
            </div>
          </aside>
        </div>

        {nextSlug ? (
          <div className="mt-12 flex justify-end">
            <Link
              href={`/projects/${nextSlug}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#1E1E2E] bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-[#C9A84C]/35 hover:shadow-[0_0_26px_rgba(201,168,76,0.10)]"
            >
              Next Project <ArrowRight className="h-4 w-4 text-[#C9A84C]" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

