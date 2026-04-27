"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { PageHeader } from "@/components/ui/PageHeader";

const values = [
  {
    title: "Faglighed",
    body: "Vi holder os skarpe inden for vores retsområder og følger løbende med i lovændringer og retspraksis.",
  },
  {
    title: "Nærhed",
    body: "Du møder altid din advokat — ikke en assistent. Personlig betjening er ikke en tilvalgsydelse hos os.",
  },
  {
    title: "Tryghed",
    body: "Juridiske spørgsmål kan føles overvældende. Vi gør sproget forståeligt og holder dig informeret hele vejen.",
  },
  {
    title: "Diskretion",
    body: "Din sag er fortrolig. Vi behandler alle klienter og sager med den respekt og fortrolighed de fortjener.",
  },
];

const timeline = [
  { year: "1964", text: "Advokatfirmaet grundlægges i Ikast." },
  { year: "1980'erne", text: "Firmaet udvider med fokus på erhvervsjura og familieretsager." },
  { year: "2000'erne", text: "Ny generation af advokater indtræder og styrker fagligheden." },
  { year: "I dag", text: "To partnere og et dedikeret team betjener private og erhvervskunder i hele Midt- og Vestjylland." },
];

function BuildingParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [40, -40]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0.7, 0.45]);

  return (
    <section ref={ref} className="relative h-[50vh] min-h-[340px] overflow-hidden bg-navy">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/building/exterior.png"
          alt="MidtAdvokaterne kontoret"
          fill
          className="object-cover object-center"
        />
      </motion.div>
      <motion.div className="absolute inset-0 bg-navy" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: "easeOut" as const }}
        viewport={{ once: true, amount: 0.4 }}
        className="absolute bottom-8 left-0 right-0 max-w-6xl mx-auto px-6 md:px-14"
      >
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Kontoret</p>
        <p className="font-body font-light text-white/80 text-lg">Sieferts Plads 5, 7430 Ikast</p>
      </motion.div>
    </section>
  );
}

export default function OmOsPage() {
  const reducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.45, ease: "easeOut" as const } },
  };

  return (
    <main className="flex flex-col">
      <PageHeader
        overline="MidtAdvokaterne · Siden 1964"
        heading="Et advokatfirma bygget på tillid"
        body="Vi er et lokalt forankret advokatfirma i Ikast med mere end 60 års erfaring. Vi kender vores klienter — og de kender os."
        imageSrc="/images/team/omos.jpg"
        imagePosition="center 20%"
        imageFilter="grayscale(45%) brightness(0.85)"
      />

      {/* Story + Timeline */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -32 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" as const }}
              viewport={{ once: true }}
            >
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-amber mb-4">Vores historie</p>
              <h2 className="font-heading text-3xl md:text-4xl text-navy mb-6 leading-tight">
                Forankret i Ikast siden 1964
              </h2>
              <div className="w-10 h-[2px] bg-amber mb-6" />
              <p className="font-body text-base text-text/65 leading-relaxed mb-4">
                MidtAdvokaterne A/S har siden 1964 ydet juridisk rådgivning til private og erhvervskunder i
                Midt- og Vestjylland. I over seks årtier har vi opbygget en dyb forståelse for lokalsamfundets
                behov og de udfordringer, vores klienter møder.
              </p>
              <p className="font-body text-base text-text/65 leading-relaxed">
                Vi er et firma i menneskelig størrelse. Det betyder, at du altid taler med en erfaren advokat —
                aldrig en assistent eller et callcenter. Vi tror på, at god juridisk rådgivning starter med et
                rigtigt menneskeligt møde.
              </p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 32 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.15, ease: "easeOut" as const }}
              viewport={{ once: true }}
              className="space-y-0"
            >
              {timeline.map(({ year, text }, i) => (
                <div key={year} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber flex-shrink-0 mt-1" />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-navy/10 mt-2 mb-0" />}
                  </div>
                  <div className="pb-8">
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-amber mb-1">{year}</p>
                    <p className="font-body text-sm text-text/65 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <BuildingParallax />

      {/* Values */}
      <section className="bg-[#111827] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" as const }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-amber mb-3">Vores værdier</p>
            <h2 className="font-heading text-3xl md:text-4xl text-white">Hvad vi tror på</h2>
            <div className="w-10 h-px bg-amber mt-4" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map(({ title, body }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="relative overflow-hidden rounded-lg p-8
                  bg-gradient-to-br from-[#111827] to-[#1C2B3A]
                  border border-white/8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-white/12 rounded-t-lg" />
                <h3 className="font-heading text-lg text-white mb-2">{title}</h3>
                <div className="w-8 h-[2px] bg-amber mb-4" />
                <p className="font-body text-sm text-white/58 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white py-20 md:py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-amber mb-4">Kom i kontakt</p>
          <h2 className="font-heading text-2xl md:text-3xl text-navy mb-4">Lad os tale om din sag</h2>
          <p className="font-body text-sm text-text/60 mb-8 leading-relaxed">
            Vi er klar til at lytte. Ring til os, eller send en besked — vi vender tilbage inden for én hverdag.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:97152233"
              className="font-body font-medium text-sm text-white bg-amber px-8 py-3.5 rounded-sm hover:bg-amber/90 transition-colors"
            >
              97 15 22 33
            </a>
            <a
              href="/kontakt"
              className="font-body font-medium text-sm text-navy border border-navy/25 px-8 py-3.5 rounded-sm hover:bg-navy/5 transition-colors"
            >
              Send en besked
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
