"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SkillBadge({ children, className }) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[#1E1E2E] bg-white/5 px-3 py-1.5 text-sm text-foreground/90",
        "shadow-[0_0_0_1px_rgba(123,97,255,0.06)_inset] hover:border-[#7B61FF]/35 hover:shadow-[0_0_24px_rgba(123,97,255,0.12)]",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#7B61FF]/80 shadow-[0_0_10px_rgba(123,97,255,0.45)]" />
      <span>{children}</span>
    </motion.span>
  );
}

