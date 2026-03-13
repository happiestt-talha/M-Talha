"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.7 });

  const size = 44;
  const dot = 6;

  const styles = useMemo(
    () => ({
      ring: {
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      },
      dot: {
        width: dot,
        height: dot,
        marginLeft: -dot / 2,
        marginTop: -dot / 2,
      },
    }),
    []
  );

  useEffect(() => {
    const ok = isFinePointer();
    setEnabled(ok);
    if (!ok) return;

    document.documentElement.classList.add("has-custom-cursor");
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <motion.div
        style={{
          translateX: ringX,
          translateY: ringY,
          ...styles.ring,
        }}
        className="fixed left-0 top-0 rounded-full"
      >
        <div className="absolute inset-0 rounded-full border border-[#C9A84C]/25 shadow-[0_0_30px_rgba(201,168,76,0.12)]" />
        <div className="absolute inset-0 rounded-full bg-[#C9A84C]/10 blur-[10px]" />
      </motion.div>

      <motion.div
        style={{
          translateX: x,
          translateY: y,
          ...styles.dot,
        }}
        className="fixed left-0 top-0 rounded-full bg-[#C9A84C] shadow-[0_0_14px_rgba(201,168,76,0.8)]"
      />
    </div>
  );
}

