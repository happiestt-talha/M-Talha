"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}>
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )} />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}>
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef();
  const progress = useMotionValue(0);
  const [pathLength, setPathLength] = useState(0);

  // Wait for the path to be ready before starting animation
  useEffect(() => {
    if (pathRef.current) {
      // Use requestAnimationFrame to ensure the element is fully rendered
      const updatePathLength = () => {
        try {
          const length = pathRef.current?.getTotalLength();
          if (length && length > 0) {
            setPathLength(length);
          }
        } catch (error) {
          console.warn("Path length calculation failed:", error);
        }
      };

      // Wait for next frame to ensure SVG is rendered
      requestAnimationFrame(updatePathLength);

      // Also listen for resize events (mobile orientation changes)
      window.addEventListener("resize", updatePathLength);
      return () => window.removeEventListener("resize", updatePathLength);
    }
  }, []);

  useAnimationFrame((time) => {
    if (pathLength) {
      const pxPerMillisecond = pathLength / duration;
      progress.set((time * pxPerMillisecond) % pathLength);
    }
  });

  const x = useTransform(progress, (val) => {
    if (!pathRef.current || pathLength === 0) return 0;
    try {
      return pathRef.current.getPointAtLength(val).x;
    } catch {
      return 0;
    }
  });

  const y = useTransform(progress, (val) => {
    if (!pathRef.current || pathLength === 0) return 0;
    try {
      return pathRef.current.getPointAtLength(val).y;
    } catch {
      return 0;
    }
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}>
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}>
        {children}
      </motion.div>
    </>
  );
};