"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative h-svh min-h-[600px] overflow-hidden bg-navy flex items-end">
      {/* Image layer */}
      <div className="absolute inset-0">
        <Image
          src="/images/team/team-hero.png"
          alt="MidtAdvokaterne team"
          fill
          className="object-cover object-top ken-burns"
          priority
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/50 to-navy/85" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24 md:pb-32">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeOut" }}
        >
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-off-white leading-tight mb-4">
            Vi er her,<br />når det betyder mest.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: "easeOut",
            delay: reducedMotion ? 0 : 0.3,
          }}
        >
          <p className="font-body text-lg md:text-xl text-off-white/80 max-w-xl mb-10">
            Erfarne advokater i Ikast — vi hjælper private og erhvervskunder siden 1964.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-amber text-navy font-body font-semibold text-base px-8 py-4 hover:bg-amber/90 transition-colors"
            >
              Kontakt os
            </a>
            <a
              href="/retsomraader"
              className="inline-flex items-center gap-2 border-2 border-off-white/70 text-off-white font-body font-semibold text-base px-8 py-4 hover:bg-off-white/10 transition-colors"
            >
              Se retsområder
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!reducedMotion && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-off-white/60">
          <div className="animate-bounce">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        </div>
      )}
    </section>
  );
}
