"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className={cn("flex items-center gap-3", className)}
    >
      <span className="font-mono text-xs tracking-[0.22em] text-[#C9A84C]">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#C9A84C]/35 via-[#7B61FF]/25 to-transparent" />
    </motion.div>
  );
}

