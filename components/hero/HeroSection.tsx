"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const d = (ms: number) => (reducedMotion ? 0 : ms);

  return (
    <section className="relative h-svh min-h-[640px] overflow-hidden bg-navy">

      {/* Building background — Ken Burns on the architecture */}
      <div className="absolute inset-0">
        <Image
          src="/images/building/exterior-front.png"
          alt=""
          fill
          className="object-cover object-center ken-burns"
          priority
        />
        {/* Left-heavy gradient: dark for text readability, building visible on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
      </div>

      {/* Content: split — text left, team pop-up right */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-end md:items-center">

        {/* Left: editorial headline block */}
        <div className="pb-24 md:pb-0 pt-32 md:pt-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.5), ease: "easeOut" as const }}
            className="font-body text-[10px] uppercase tracking-[0.35em] text-amber mb-7"
          >
            Advokater i Ikast siden 1964
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.75), delay: d(0.1), ease: "easeOut" as const }}
            className="font-heading text-[2.6rem] md:text-5xl lg:text-[3.5rem] text-off-white leading-[1.1] mb-7"
          >
            Vi er her,<br />når det<br />betyder mest.
          </motion.h1>

          {/* Amber rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: d(0.5), delay: d(0.4) }}
            style={{ transformOrigin: "left" }}
            className="w-12 h-px bg-amber mb-7"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.5), delay: d(0.5), ease: "easeOut" as const }}
            className="font-body text-sm text-off-white/65 max-w-[280px] leading-relaxed mb-10"
          >
            Vi hjælper private og erhvervskunder med tryghed, faglighed og personlig betjening.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.4), delay: d(0.65), ease: "easeOut" as const }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="/kontakt"
              className="inline-flex items-center bg-amber text-navy font-body font-semibold text-sm px-7 py-3.5 hover:bg-amber/90 transition-colors"
            >
              Kontakt os
            </a>
            <a
              href="/retsomraader"
              className="inline-flex items-center border border-off-white/30 text-off-white font-body font-semibold text-sm px-7 py-3.5 hover:bg-off-white/8 transition-colors"
            >
              Se retsområder
            </a>
          </motion.div>
        </div>

        {/* Right: cut-out team photo rises up from below — pop-up animation */}
        <div className="hidden md:flex items-end justify-center h-full">
          <div
            className="pop-up relative w-full"
            style={{ height: "82%", maxHeight: "540px" }}
          >
            <Image
              src="/images/team/team-hero.png"
              alt="MidtAdvokaterne team"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom centre */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-off-white/35">
        <span className="font-body text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <svg
          width="13"
          height="18"
          viewBox="0 0 13 18"
          fill="none"
          className="animate-bounce"
          aria-hidden="true"
        >
          <path
            d="M6.5 2L6.5 16M6.5 16L2 11.5M6.5 16L11 11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
