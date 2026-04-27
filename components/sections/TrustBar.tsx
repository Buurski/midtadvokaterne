"use client";

import { motion, useReducedMotion } from "motion/react";

const trustItems = [
  { number: "60+", label: "Års erfaring", sub: "Grundlagt 1964" },
  { number: "2", label: "Erfarne partnere", sub: "Martin & Loa" },
  { number: "100%", label: "Personlig betjening", sub: "Du taler altid med en advokat" },
  { number: "Ikast", label: "Lokalt forankret", sub: "Midt i Jylland" },
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
    /* Float the bar up onto the hero so the photo shows through the blur */
    <section className="relative z-20 -mt-16 mx-4 md:mx-12 rounded-2xl py-10 md:py-12
      bg-white/10 backdrop-blur-2xl
      border border-white/15
      shadow-[0_8px_40px_rgba(0,0,0,0.22)]">

      {/* Top specular highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/25 rounded-t-2xl" />

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
              <div className="font-heading text-4xl text-white font-light">{item.number}</div>
              <div className="font-body text-[11px] font-semibold text-white/100 uppercase tracking-widest mt-1">
                {item.label}
              </div>
              <div className="font-body text-xs text-[#7a9bbe] mt-0.5">{item.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
