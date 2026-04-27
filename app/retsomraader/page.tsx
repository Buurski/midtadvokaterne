"use client";

import { motion, useReducedMotion } from "motion/react";
import { PageHeader } from "@/components/ui/PageHeader";

const privatAreas = [
  {
    title: "Familieret",
    description:
      "Vi hjælper dig igennem skilsmisse, separation, forældreansvar og samværsaftaler med ro og faglighed. Din situation er unik — vi behandler den som sådan.",
    tags: ["Skilsmisse", "Separation", "Forældreansvar", "Samvær"],
  },
  {
    title: "Testamenter & arv",
    description:
      "Et gyldigt testamente sikrer, at dine værdier havner de rigtige steder. Vi rådgiver om arveplanlægning, bo­skifter og arvepagter.",
    tags: ["Testamente", "Arveplanlægning", "Boskifte", "Arveafgift"],
  },
  {
    title: "Bolighandel",
    description:
      "Vi gennemgår din købsaftale, skøde og servitutter, så du handler trygt. Vi repræsenterer dig overfor sælger, bank og tinglysning.",
    tags: ["Købsaftale", "Skøde", "Tinglysning", "Servitutter"],
  },
  {
    title: "Lejeret",
    description:
      "Uanset om du er lejer eller udlejer, hjælper vi med lejekontrakter, opsigelser, huslejenævn og tvister.",
    tags: ["Lejekontrakt", "Opsigelse", "Huslejenævn", "Tvister"],
  },
  {
    title: "Bistandsadvokat",
    description:
      "Er du part i en straffesag eller offer for en forbrydelse? Vi sikrer, at du har en stærk stemme i retten og kender dine rettigheder.",
    tags: ["Straffesag", "Offer", "Retten", "Rettigheder"],
  },
];

const erhvervAreas = [
  {
    title: "Selskabsret",
    description:
      "Fra stiftelse og vedtægter til generalforsamlinger og aktionæroverenskomster — vi er din juridiske partner i hele selskabets livscyklus.",
    tags: ["Stiftelse", "Vedtægter", "Aktionæroverenskomst", "Generalforsamling"],
  },
  {
    title: "Konkurs & rekonstruktion",
    description:
      "Tvangsopløsning, konkursbehandling og rekonstruktion kræver hurtig og erfaren juridisk bistand. Vi handler hurtigt og beskytter dine interesser.",
    tags: ["Konkursbehandling", "Rekonstruktion", "Tvangsopløsning", "Fordringer"],
  },
  {
    title: "Inkasso & fordringer",
    description:
      "Vi indriver dine tilgodehavender effektivt — fra rykkerskrivelse til fuldbyrdelse. Vi håndterer forhandling og retssager.",
    tags: ["Inkasso", "Rykker", "Fogedret", "Fordringer"],
  },
  {
    title: "Kontrakter",
    description:
      "Klare kontrakter forebygger tvister. Vi udarbejder og gennemgår samarbejdsaftaler, leverandørkontrakter og ansættelseskontrakter.",
    tags: ["Samarbejdsaftaler", "Leverandørkontrakter", "Ansættelse", "Fortrolighed"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function AreaCard({
  title,
  description,
  tags,
  dark,
}: {
  title: string;
  description: string;
  tags: string[];
  dark?: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" as const }}
      className={`relative overflow-hidden rounded-lg p-8 flex flex-col ${
        dark
          ? "bg-gradient-to-br from-[#111827] to-[#1C2B3A] border border-white/8"
          : "bg-white/70 backdrop-blur-xl border border-navy/10 shadow-[0_4px_24px_rgba(26,43,69,0.07)]"
      }`}
    >
      {dark && (
        <div className="absolute inset-x-0 top-0 h-px bg-white/12 rounded-t-lg" />
      )}
      {!dark && (
        <div className="absolute inset-x-0 top-0 h-px bg-white/80 rounded-t-lg" />
      )}

      <h3
        className={`font-heading text-xl mb-2 ${dark ? "text-white" : "text-navy"}`}
      >
        {title}
      </h3>
      <div className="w-8 h-[2px] bg-amber mb-4" />
      <p
        className={`font-body text-sm leading-relaxed mb-6 flex-1 ${
          dark ? "text-white/60" : "text-text/65"
        }`}
      >
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`text-[10px] font-body px-2.5 py-1 rounded-sm ${
              dark
                ? "text-white/55 border border-white/15"
                : "text-navy/55 border border-navy/12"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function RetsomraaderPage() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="flex flex-col">
      <PageHeader
        overline="MidtAdvokaterne · Ikast"
        heading="Vores retsområder"
        body="Vi rådgiver både private og erhvervskunder. Find det retsområde, der passer til din situation."
        imageSrc="/images/building/retsområder.jpg"
        imagePosition="center center"
        imageFilter="grayscale(15%) brightness(0.9)"
      />

      {/* Privat */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" as const }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-amber mb-3">
              For private
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-navy">
              Juridisk hjælp til privatpersoner
            </h2>
            <div className="w-12 h-px bg-amber mt-4" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {privatAreas.map((area) => (
              <AreaCard key={area.title} {...area} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Erhverv */}
      <section className="bg-[#111827] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" as const }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-amber mb-3">
              For erhverv
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-white">
              Juridisk partner for din virksomhed
            </h2>
            <div className="w-12 h-px bg-amber mt-4" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {erhvervAreas.map((area) => (
              <AreaCard key={area.title} {...area} dark />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white py-20 md:py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-amber mb-4">
            Usikker på hvor du hører til?
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-navy mb-4">
            Ring til os — vi finder ud af det sammen
          </h2>
          <p className="font-body text-sm text-text/60 mb-8 leading-relaxed">
            Alle sager starter med en samtale. Vi lytter, og vi ved, hvad du har brug for.
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
