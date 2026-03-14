"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { person } from "@/lib/content";

export function ContactSection() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setErrorMsg(data.error || "Something went wrong.");
      return;
    }

    setStatus("success");
    e.target.reset();
  }

  return (
    <section id="contact" className="relative py-24" aria-label="Contact">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <BackgroundBeams className="opacity-55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.10),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>// let's connect</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start"
        >
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Have a project in mind? Let's build it.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Send a message and I'll get back to you quickly. I'm happy to discuss
              scope, timelines, and a high-quality execution plan.
            </p>

            <div className="mt-8 grid gap-3">
              <MagneticButton href={person.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 text-[#7B61FF]" /> GitHub
              </MagneticButton>
              <MagneticButton href={person.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 text-[#7B61FF]" /> LinkedIn
              </MagneticButton>
              <MagneticButton href={`mailto:${person.email}`}>
                <Mail className="h-4 w-4 text-[#C9A84C]" /> {person.email}
              </MagneticButton>
              <MagneticButton href={`tel:${person.phone.replaceAll(" ", "")}`}>
                <Phone className="h-4 w-4 text-[#C9A84C]" /> {person.phone}
              </MagneticButton>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass gold-violet-border rounded-3xl p-6">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                  <p className="text-lg font-semibold text-foreground">Message sent!</p>
                  <p className="text-sm text-muted-foreground">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-sm text-muted-foreground">Name</span>
                      <input
                        name="name"
                        required
                        placeholder="Your name"
                        className="h-11 rounded-2xl border border-[#1E1E2E] bg-black/30 px-4 text-sm text-foreground outline-none ring-0 focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="h-11 rounded-2xl border border-[#1E1E2E] bg-black/30 px-4 text-sm text-foreground outline-none ring-0 focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
                      />
                    </label>
                  </div>

                  <label className="grid gap-2">
                    <span className="text-sm text-muted-foreground">Message</span>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell me about your project..."
                      className="resize-none rounded-2xl border border-[#1E1E2E] bg-black/30 p-4 text-sm text-foreground outline-none ring-0 focus:border-[#7B61FF]/40 focus:shadow-[0_0_0_3px_rgba(123,97,255,0.08)]"
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-red-400">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-2xl border border-[#C9A84C]/30 bg-[#0A0A0F]/40 px-5 text-sm font-semibold text-foreground shadow-[0_0_24px_rgba(201,168,76,0.10)] disabled:opacity-60"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative">
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}