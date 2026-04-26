"use client";

import { motion, useReducedMotion } from "motion/react";

export function TaglineSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-off-white py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-5xl text-navy leading-snug mb-8">
            Juridisk hjælp, der tager dig alvorligt.
          </h2>
        </motion.div>

        <div className="w-16 h-px bg-amber mx-auto mb-8" />

        <p className="font-body text-lg text-text/80 leading-relaxed max-w-2xl mx-auto">
          Vi har hjulpet familier og virksomheder i Ikast-området i mere end 60 år. Hos
          MidtAdvokaterne får du en dedikeret advokat — ikke et callcenter. Vi er
          tilgængelige, ærlige og altid på din side.
        </p>
      </div>
    </section>
  );
}
