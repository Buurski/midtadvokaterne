"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function BuildingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves up as user scrolls down through the section
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [60, -60]);
  // Overlay fades out as image comes into view
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0.75, 0.45]);
  // Subtle scale-in on entry
  const scale = useTransform(scrollYProgress, [0, 0.3], reducedMotion ? [1, 1] : [1.04, 1]);

  return (
    <section ref={ref} className="relative h-[55vh] min-h-[380px] overflow-hidden bg-navy">
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <Image
          src="/images/building/exterior.png"
          alt="MidtAdvokaterne — kontoret i Ikast"
          fill
          className="object-cover object-center"
        />
      </motion.div>

      {/* Navy overlay — softens the image so it doesn't compete with content */}
      <motion.div
        className="absolute inset-0 bg-navy"
        style={{ opacity: overlayOpacity }}
      />

      {/* Subtle vignette at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

      {/* Caption — bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: "easeOut" as const }}
        viewport={{ once: true, amount: 0.4 }}
        className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-8 md:px-14"
      >
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
          Ikast · Siden 1964
        </p>
        <p className="font-body font-light text-white/80 text-lg">
          Find os på Sieferts Pl. 5, 7430 Ikast
        </p>
      </motion.div>
    </section>
  );
}
