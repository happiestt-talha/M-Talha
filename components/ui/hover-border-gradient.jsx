"use client";;
import React, { useState, useEffect } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = currentDirection => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: "radial-gradient(22% 55% at 50% 0%, rgba(201,168,76,0.85) 0%, rgba(201,168,76,0) 70%)",
    LEFT: "radial-gradient(20% 55% at 0% 50%, rgba(123,97,255,0.85) 0%, rgba(123,97,255,0) 70%)",
    BOTTOM:
      "radial-gradient(22% 55% at 50% 100%, rgba(201,168,76,0.85) 0%, rgba(201,168,76,0) 70%)",
    RIGHT:
      "radial-gradient(20% 55% at 100% 50%, rgba(123,97,255,0.85) 0%, rgba(123,97,255,0) 70%)",
  };

  const highlight =
    "radial-gradient(75% 160% at 50% 50%, rgba(123,97,255,0.65) 0%, rgba(201,168,76,0.35) 35%, rgba(255,255,255,0) 75%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);
  return (
    <Tag
      onMouseEnter={(event) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full content-center bg-black/30 hover:bg-black/20 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}>
      <div
        className={cn(
          "w-auto text-white z-10 bg-[#0A0A0F]/55 px-4 py-2 rounded-[inherit] border border-[#1E1E2E]",
          className
        )}>
        {children}
      </div>
      <motion.div
        className={cn("flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]")}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }} />
      <div className="bg-[#0A0A0F]/55 absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}
