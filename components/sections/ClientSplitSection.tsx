"use client";

import { motion, useReducedMotion } from "motion/react";

export function ClientSplitSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-off-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" as const }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.2em] text-amber mb-3">
            Hvem hjælper vi?
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-navy">
            Din situation, vores ekspertise
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Privat — dark glass panel */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -48 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" as const }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg p-10 md:p-12
              bg-gradient-to-br from-[#111827] to-[#1C2B3A]
              border border-white/8
              shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
          >
            {/* Glass sheen */}
            <div className="absolute inset-0 bg-white/4 backdrop-blur-sm rounded-lg pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/12 rounded-t-lg" />

            <div className="relative">
              {/* Person icon — grey */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
                <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <h3 className="font-heading text-2xl md:text-3xl text-white mt-4 mb-3">
                Privat
              </h3>
              <div className="w-25 h-[2px] bg-amber mb-4" />
              <p className="font-body text-lg text-white/60 leading-relaxed mb-8">
                Skilsmisse, arv, testamente, bolighandel, lejeret — vi guider dig trygt
                igennem, uanset hvad livet bringer.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Familieret", "Lejeret", "Bolighandel", "Testamenter"].map((area) => (
                  <span
                    key={area}
                    className="text-xs font-body text-white/60 border border-white/20 px-3 py-1 rounded-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <a
                href="/retsomraader"
                className="inline-block mt-8 font-body text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Se alle retsområder →
              </a>
            </div>
          </motion.div>

          {/* Erhverv — light glass panel */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 48 }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              ease: "easeOut" as const,
              delay: reducedMotion ? 0 : 0.15,
            }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg p-10 md:p-12
              bg-white/70 backdrop-blur-xl
              border border-navy/10
              shadow-[0_8px_32px_rgba(26,43,69,0.08)]"
          >
            {/* Glass sheen */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/80 rounded-t-lg" />

            <div className="relative">
              {/* Building icon — navy */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="10" width="18" height="11" stroke="#1A2B45" strokeWidth="1.5" />
                <path d="M8 10V7a4 4 0 018 0v3" stroke="#1A2B45" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <h3 className="font-heading text-2xl md:text-3xl text-navy mt-4 mb-3">
                Erhverv
              </h3>
              <div className="w-25 h-[2px] bg-amber mb-4" />
              <p className="font-body text-lg text-text/65 leading-relaxed mb-8">
                Selskabsret, konkurs, kontraktforhold, inkasso — vi er en stærk juridisk
                partner for din virksomhed i Midt- og Vestjylland.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Selskabsret", "Konkurs", "Inkasso", "Kontrakter"].map((area) => (
                  <span
                    key={area}
                    className="text-xs font-body text-navy/60 border border-navy/15 px-3 py-1 rounded-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <a
                href="/retsomraader"
                className="inline-block mt-8 font-body text-sm font-medium text-navy/60 hover:text-navy transition-colors"
              >
                Se erhvervsydelser →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
