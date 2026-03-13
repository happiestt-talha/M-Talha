"use client";

import { useEffect } from "react";

export function ScrollToOnLoad() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("section");
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}

