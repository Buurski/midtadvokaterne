export function CtaStrip() {
  return (
    <section className="bg-amber py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-navy/60 mb-4">
          Klar til at tale med en advokat?
        </p>
        <a
          href="tel:97152233"
          className="font-heading text-4xl md:text-6xl text-navy hover:opacity-80 transition-opacity block mb-2"
        >
          97 15 22 33
        </a>
        <p className="font-body text-sm text-navy/60 mb-10">
          Mandag–fredag 8.00–16.00 · Sieferts Plads 5, 7430 Ikast
        </p>
        <a
          href="/kontakt"
          className="inline-flex items-center gap-2 bg-navy text-off-white font-body font-semibold text-base px-10 py-4 hover:bg-navy/90 transition-colors"
        >
          Send os en besked
        </a>
      </div>
    </section>
  );
}
