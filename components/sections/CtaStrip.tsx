export function CtaStrip() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-[#111827]">
      {/* Top specular */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      {/* Glass panel */}
      <div className="absolute inset-x-12 md:inset-x-24 inset-y-8 rounded-2xl
        bg-white/14 backdrop-blur-2xl
        border border-white/22
        shadow-[0_0_60px_rgba(10,158,158,0.18),0_20px_60px_rgba(10,158,158,0.12),0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.22)]
        pointer-events-none" />

      {/* Radial gradient underneath the glass: white-ish centre → teal outskirts */}
      <div
        className="absolute inset-x-12 md:inset-x-24 inset-y-8 rounded-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 110%, rgba(10,158,158,0.35) 0%, rgba(10,158,158,0.12) 40%, rgba(255,255,255,0.04) 70%, transparent 100%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">
          Klar til at tale med en advokat?
        </p>
        <a
          href="tel:97152233"
          className="font-heading text-4xl md:text-6xl text-white font-light hover:text-amber transition-colors duration-300 block mb-3"
        >
          97 15 22 33
        </a>
        <p className="font-body text-sm text-white/40 mb-10">
          Mandag–fredag 8.00–16.00 · Sieferts Plads 5, 7430 Ikast
        </p>
        <a
          href="/kontakt"
          className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-white font-body font-medium text-sm px-10 py-4 rounded-sm border border-white/25 hover:bg-white/20 hover:border-white/40 transition-all duration-200"
        >
          Send os en besked
        </a>
      </div>
    </section>
  );
}
