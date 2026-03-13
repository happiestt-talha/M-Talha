"use client";

import { useEffect, useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";

export function AppShell({ children }) {
  // Prevents hydration mismatch for cursor position / scroll spy.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted ? <CustomCursor /> : null}
      <Navbar />
      <main className="relative z-10">
        <TracingBeam className="max-w-none px-4 sm:px-6 lg:px-8">
          {children}
        </TracingBeam>
      </main>
      <Footer />
    </>
  );
}

