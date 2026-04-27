"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PageHeader } from "@/components/ui/PageHeader";

const infoItems = [
  {
    label: "Adresse",
    value: "Sieferts Plads 5\n7430 Ikast",
    href: "https://maps.google.com/?q=Sieferts+Plads+5+7430+Ikast",
    linkLabel: "Se på kort →",
  },
  {
    label: "Telefon",
    value: "97 15 22 33",
    href: "tel:97152233",
    linkLabel: "Ring nu →",
  },
  {
    label: "Åbningstider",
    value: "Man–tors 8:00–16:30\nFredag 8:00–15:00",
  },
];

export default function KontaktPage() {
  const reducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="flex flex-col">
      <PageHeader
        overline="MidtAdvokaterne · Ikast"
        heading="Kontakt os"
        body="Ring til os, send en besked eller kig forbi. Vi svarer inden for én hverdag."
        imageSrc="/images/team/hammer.jpg"
        imagePosition="center center"
        imageFilter="grayscale(80%) brightness(0.75) contrast(1.05)"
      />

      <section className="bg-off-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

            {/* Contact info */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -32 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" as const }}
              viewport={{ once: true }}
            >
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-amber mb-4">Find os</p>
              <h2 className="font-heading text-3xl md:text-4xl text-navy mb-6 leading-tight">
                Vi er her for dig
              </h2>
              <div className="w-10 h-[2px] bg-amber mb-10" />

              <div className="space-y-8">
                {infoItems.map(({ label, value, href, linkLabel }) => (
                  <div key={label}>
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-amber mb-2">{label}</p>
                    <p className="font-body text-base text-navy whitespace-pre-line leading-relaxed">{value}</p>
                    {href && linkLabel && (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-body text-sm text-navy/50 hover:text-navy transition-colors mt-1 inline-block"
                      >
                        {linkLabel}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-navy/10 mt-10 pt-8">
                <p className="font-body text-sm text-text/55 leading-relaxed">
                  Er din sag presserende? Ring direkte til os på{" "}
                  <a href="tel:97152233" className="text-navy hover:text-amber transition-colors font-medium">
                    97 15 22 33
                  </a>
                  . Vi gør vores bedste for at hjælpe dig hurtigt.
                </p>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 32 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.15, ease: "easeOut" as const }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg p-8 md:p-10
                bg-white/70 backdrop-blur-xl
                border border-navy/10
                shadow-[0_8px_32px_rgba(26,43,69,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-white/80 rounded-t-lg" />

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="#0a9e9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl text-navy mb-2">Tak for din besked</h3>
                  <p className="font-body text-sm text-text/60">Vi vender tilbage inden for én hverdag.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-xl text-navy mb-1">Send en besked</h3>
                  <div className="w-8 h-[2px] bg-amber mb-6" />

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-body text-[10px] uppercase tracking-[0.2em] text-navy/50 mb-1.5 block">
                          Navn
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Dit navn"
                          className="w-full font-body text-sm text-navy bg-white/60 border border-navy/15 rounded-sm px-4 py-3 placeholder:text-navy/30 focus:outline-none focus:border-amber focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-body text-[10px] uppercase tracking-[0.2em] text-navy/50 mb-1.5 block">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          placeholder="Dit telefonnummer"
                          className="w-full font-body text-sm text-navy bg-white/60 border border-navy/15 rounded-sm px-4 py-3 placeholder:text-navy/30 focus:outline-none focus:border-amber focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-body text-[10px] uppercase tracking-[0.2em] text-navy/50 mb-1.5 block">
                        E-mail
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="din@email.dk"
                        className="w-full font-body text-sm text-navy bg-white/60 border border-navy/15 rounded-sm px-4 py-3 placeholder:text-navy/30 focus:outline-none focus:border-amber focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-body text-[10px] uppercase tracking-[0.2em] text-navy/50 mb-1.5 block">
                        Emne
                      </label>
                      <select
                        className="w-full font-body text-sm text-navy bg-white/60 border border-navy/15 rounded-sm px-4 py-3 focus:outline-none focus:border-amber focus:bg-white transition-colors appearance-none"
                      >
                        <option value="">Vælg retsområde</option>
                        <option>Familieret</option>
                        <option>Testamente & arv</option>
                        <option>Bolighandel</option>
                        <option>Lejeret</option>
                        <option>Selskabsret</option>
                        <option>Konkurs & rekonstruktion</option>
                        <option>Inkasso</option>
                        <option>Andet</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-body text-[10px] uppercase tracking-[0.2em] text-navy/50 mb-1.5 block">
                        Besked
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Beskriv kort din situation..."
                        className="w-full font-body text-sm text-navy bg-white/60 border border-navy/15 rounded-sm px-4 py-3 placeholder:text-navy/30 focus:outline-none focus:border-amber focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    <p className="font-body text-[10px] text-navy/40 leading-relaxed">
                      Din henvendelse behandles fortroligt i overensstemmelse med vores{" "}
                      <a href="/privatlivspolitik" className="underline hover:text-navy/60">privatlivspolitik</a>.
                    </p>

                    <button
                      type="submit"
                      className="w-full font-body font-medium text-sm text-white bg-amber py-3.5 rounded-sm hover:bg-amber/90 transition-colors"
                    >
                      Send besked
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dark bottom strip */}
      <section className="bg-[#111827] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-amber mb-3">Adresse</p>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                Sieferts Plads 5<br />7430 Ikast
              </p>
            </div>
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-amber mb-3">Telefon</p>
              <a href="tel:97152233" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                97 15 22 33
              </a>
            </div>
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-amber mb-3">Åbningstider</p>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                Man–tors 8:00–16:30<br />Fredag 8:00–15:00
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
