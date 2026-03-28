"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect, useState, useRef } from "react";

// ── Original TypewriterEffect (unchanged) ─────────────────────────────────────
export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" }
      );
    }
  }, [isInView]);

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span
                initial={{}}
                key={`char-${index}`}
                className={cn(
                  "dark:text-white text-black opacity-0 hidden",
                  word.className
                )}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      />
    </div>
  );
};

// ── New cycling TypewriterEffectSmooth ────────────────────────────────────────
const TYPE_SPEED = 60;    // ms per character while typing
const DELETE_SPEED = 30;  // ms per character while deleting
const PAUSE_AFTER = 1800; // ms to pause when fully typed

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}) => {
  const roles = words.map((w) => w.text);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("typing");
  const timeout = useRef(null);

  useEffect(() => {
    const current = roles[roleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, TYPE_SPEED);
      } else {
        timeout.current = setTimeout(() => setPhase("pausing"), PAUSE_AFTER);
      }
    }

    if (phase === "pausing") {
      timeout.current = setTimeout(() => setPhase("deleting"), 0);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setPhase("typing");
      }
    }

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [displayed, phase, roleIndex]);

  return (
    <div className={cn("flex items-center my-6", className)}>
      <span className="text-sm sm:text-base md:text-xl font-bold text-foreground whitespace-nowrap">
        {displayed}
      </span>

      {/* blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "ml-0.5 inline-block rounded-sm w-[3px] h-4 sm:h-5 md:h-6 bg-[#C9A84C]",
          cursorClassName
        )}
      />
    </div>
  );
};