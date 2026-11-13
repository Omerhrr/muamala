"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      {/* Gold glow behind phone */}
      <div className="absolute -inset-8 -z-10 rounded-full bg-gold-500/20 blur-3xl" aria-hidden="true" />

      <div className="rounded-[2.6rem] border border-gold-500/40 bg-brand-950 p-2.5 shadow-2xl shadow-brand-950/60">
        <div className="relative h-[580px] overflow-hidden rounded-[2rem] bg-[#f6f4ec]">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-brand-950" aria-hidden="true" />
          {children}
        </div>
      </div>
    </div>
  );
}

export function FloatingCard({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: reduce ? 0 : [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: reduce
          ? { duration: 0 }
          : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  );
}
