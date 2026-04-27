"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface PageHeaderProps {
  overline: string;
  heading: string;
  body?: string;
  imageSrc?: string;
  imagePosition?: string;
  imageFilter?: string;
}

export function PageHeader({
  overline,
  heading,
  body,
  imageSrc,
  imagePosition = "center center",
  imageFilter,
}: PageHeaderProps) {
  const reducedMotion = useReducedMotion();
  const d = (ms: number) => (reducedMotion ? 0 : ms);

  return (
    <section className="relative bg-gradient-to-br from-[#0D1520] to-[#1A2B45] pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">

      {/* Background image (optional) */}
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            style={{
              objectPosition: imagePosition,
              filter: imageFilter,
            }}
            priority
          />
          {/* Dark base overlay */}
          <div className="absolute inset-0" style={{ background: "rgba(10, 16, 28, 0.60)" }} />
          {/* Gradient — darkens bottom so text is sharp */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1520]/80 via-[#0D1520]/30 to-transparent" />
          {/* Left-side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1520]/50 via-transparent to-transparent" />
        </div>
      )}

      {/* No image: subtle teal glow + grid texture */}
      {!imageSrc && (
        <>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber/8 rounded-full blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </>
      )}

      {/* Bottom fade into page bg */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-off-white to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-14">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: d(0.5) }}
          className="font-body text-[10px] uppercase tracking-[0.35em] text-amber mb-5"
        >
          {overline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(0.55), delay: d(0.1), ease: "easeOut" as const }}
          className="font-heading text-4xl md:text-6xl text-white font-light leading-tight max-w-2xl"
        >
          {heading}
        </motion.h1>
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.5), delay: d(0.25), ease: "easeOut" as const }}
            className="font-body text-base font-light text-white/55 mt-6 max-w-xl leading-relaxed"
          >
            {body}
          </motion.p>
        )}
      </div>
    </section>
  );
}
