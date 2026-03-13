"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticButton({ children, className, strength = 18, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  return (
    <motion.a
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        x.set((dx / r.width) * strength);
        y.set((dy / r.height) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-2xl border border-[#1E1E2E] bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition",
        "hover:border-[#7B61FF]/35 hover:shadow-[0_0_26px_rgba(123,97,255,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}

