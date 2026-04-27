"use client";

import { motion, useReducedMotion } from "motion/react";
import { TeamCard } from "@/components/team/TeamCard";

// TODO: extract to CMS or data file
const partners = [
  {
    name: "Martin Plum Juul",
    title: "Advokat og partner",
    practiceAreas: ["Konkurs", "Selskabsret", "Lejeret"],
    contact: "96 60 64 45",
    contactType: "phone" as const,
    imageSrc: "martin-plum-juul.png",
    isPartner: true,
  },
  {
    name: "Loa Nedergaard Olsen",
    title: "Advokat og partner",
    practiceAreas: ["Familieret", "Testamenter", "Bistandsadvokat"],
    contact: "96 60 64 44",
    contactType: "phone" as const,
    imageSrc: "loa-nedergaard-olsen..png",
    isPartner: true,
  },
];

const staff = [
  {
    name: "Jeanie Dam Meldgaard",
    title: "Advokat",
    practiceAreas: ["Familieret", "Lejeret"],
    contact: "jda@midtadvokaterne.dk",
    contactType: "email" as const,
    imageSrc: "jeanie-dam-meldgaard.png",
  },
  {
    name: "Tina Riis Thygesen",
    title: "Advokatsekretær",
    practiceAreas: [],
    imageSrc: "tina-riis-thygesen.jpg",
  },
  {
    name: "Line Lauridsen",
    title: "Advokatsekretær",
    practiceAreas: [],
    imageSrc: "line-lauridsen.jpg",
    notice: "På barsel",
  },
  {
    name: "Heidi Bardtrum",
    title: "Advokatsekretær (vikar)",
    practiceAreas: [],
  },
];

export function TeamSection() {
  const reducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="bg-off-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading — slide up on scroll */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="font-body text-xs uppercase tracking-[0.2em] text-amber mb-3">
            Mød teamet
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-navy">
            Mennesker du kan stole på
          </h2>
        </motion.div>
        <div className="w-16 h-px bg-amber mx-auto mb-16" />

        {/* Partners — 2 centred cards at natural photo scale */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-xl mx-auto mb-20"
        >
          {partners.map((p) => (
            <motion.div key={p.name} variants={cardVariants}>
              <TeamCard {...p} />
            </motion.div>
          ))}
        </motion.div>

        {/* Staff — 2-col horizontal compact cards */}
        <div className="border-t border-navy/10 pt-12">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-text/40 text-center mb-8">Kontoret</p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-10 mx-auto justify-items-center"
          >
            {staff.map((s, i) => (
              <motion.div key={s.name} variants={cardVariants}>
                <TeamCard {...s} reversed={i % 2 === 0} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
