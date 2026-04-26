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
          {/* Left card — Privat, slides in from left */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -48 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" as const }}
            viewport={{ once: true }}
            className="bg-navy p-10 md:p-12"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" stroke="#C4973A" strokeWidth="1.5" />
              <path
                d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
                stroke="#C4973A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <h3 className="font-heading text-2xl md:text-3xl text-off-white mt-4 mb-4">
              Privat
            </h3>
            <p className="font-body text-base text-off-white/70 leading-relaxed mb-8">
              Skilsmisse, arv, testamente, bolighandel, lejeret — vi guider dig trygt
              igennem, uanset hvad livet bringer.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Familieret", "Lejeret", "Bolighandel", "Testamenter"].map((area) => (
                <span
                  key={area}
                  className="text-xs font-body text-amber border border-amber/40 px-3 py-1"
                >
                  {area}
                </span>
              ))}
            </div>
            <a
              href="/retsomraader"
              className="inline-block mt-8 font-body text-sm font-semibold text-amber hover:underline"
            >
              Se alle retsområder →
            </a>
          </motion.div>

          {/* Right card — Erhverv, slides in from right */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 48 }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              ease: "easeOut" as const,
              delay: reducedMotion ? 0 : 0.15,
            }}
            viewport={{ once: true }}
            className="bg-navy/8 border border-navy/12 p-10 md:p-12"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="10"
                width="18"
                height="11"
                stroke="#C4973A"
                strokeWidth="1.5"
              />
              <path
                d="M8 10V7a4 4 0 018 0v3"
                stroke="#C4973A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <h3 className="font-heading text-2xl md:text-3xl text-navy mt-4 mb-4">
              Erhverv
            </h3>
            <p className="font-body text-base text-text/70 leading-relaxed mb-8">
              Selskabsret, konkurs, kontraktforhold, inkasso — vi er en stærk juridisk
              partner for din virksomhed i Midt- og Vestjylland.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Selskabsret", "Konkurs", "Inkasso", "Kontrakter"].map((area) => (
                <span
                  key={area}
                  className="text-xs font-body text-navy/70 bg-navy/8 px-3 py-1"
                >
                  {area}
                </span>
              ))}
            </div>
            <a
              href="/retsomraader"
              className="inline-block mt-8 font-body text-sm font-semibold text-navy hover:underline"
            >
              Se erhvervsydelser →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
