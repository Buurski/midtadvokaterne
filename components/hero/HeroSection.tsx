"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const d = (ms: number) => (reducedMotion ? 0 : ms);

  return (
    <section className="relative h-[70vh] min-h-[560px] overflow-hidden bg-[#0D1520]">

      {/* Photo — martinogloa.jpg is a JPG, no transparency issues */}
      <div className="absolute inset-0">
        <Image
          src="/images/team/martinogloa.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Warm olive-dark overlay — matches editorial law firm reference */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(18, 28, 22, 0.52)" }}
        />
        {/* Extra darkening at bottom-left so text is always sharp */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1520]/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1520]/50 via-transparent to-transparent" />
      </div>

      {/* Content — bottom-left, editorial */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full px-8 md:px-14 pb-16 md:pb-20">

          {/* Overline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: d(0.6), ease: "easeOut" as const }}
            className="font-body text-[10px] uppercase tracking-[0.38em] text-amber/70 mb-7"
          >
            Advokater · Ikast · Siden 1964
          </motion.p>

          {/* Display heading — two-weight treatment */}
          <h1 className="leading-none">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: d(0.65), delay: d(0.1), ease: "easeOut" as const }}
              className="block font-body font-light text-[clamp(3.2rem,7vw,5.75rem)] text-white"
            >
              Juridisk
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: d(0.65), delay: d(0.22), ease: "easeOut" as const }}
              className="block font-body font-bold text-[clamp(3.2rem,7vw,5.75rem)] text-amber"
            >
              rådgivning.
            </motion.span>
          </h1>

          {/* Body copy — constrained width */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.55), delay: d(0.4), ease: "easeOut" as const }}
            className="font-body text-base font-light text-white/65 mt-8 max-w-[500px] leading-[1.65]"
          >
            Erfarne advokater i Ikast — vi hjælper private og erhvervskunder med
            faglighed, tryghed og personlig betjening siden 1964.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.45), delay: d(0.55), ease: "easeOut" as const }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href="/kontakt"
              className="font-body font-medium text-sm text-navy bg-amber px-8 py-3.5 hover:bg-amber/90 transition-colors"
            >
              Kontakt os
            </a>
            <a
              href="/retsomraader"
              className="font-body font-medium text-sm text-white border border-white/25 px-8 py-3.5 hover:bg-white/8 transition-colors"
            >
              Se retsområder
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — very subtle */}
      <div className="absolute bottom-6 right-10 z-10 flex items-center gap-2 text-white/30">
        <span className="font-body text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" className="animate-bounce" aria-hidden="true">
          <path d="M6 1L6 15M6 15L1.5 10.5M6 15L10.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
