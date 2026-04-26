"use client";

import { motion, useReducedMotion } from "motion/react";

const trustItems = [
  { number: "60+", label: "Års erfaring", sub: "Grundlagt 1964" },
  { number: "2", label: "Erfarne partnere", sub: "Martin & Loa" },
  { number: "100%", label: "Personlig betjening", sub: "Du taler altid med en advokat" },
  { number: "4.9★", label: "Google-anmeldelser", sub: "Vores klienter anbefaler os" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export function TrustBar() {
  const reducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="bg-navy py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="text-center"
            >
              <div className="font-heading text-4xl text-amber">{item.number}</div>
              <div className="font-body text-sm font-semibold text-off-white uppercase tracking-widest mt-1">
                {item.label}
              </div>
              <div className="font-body text-xs text-off-white/60 mt-0.5">{item.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
