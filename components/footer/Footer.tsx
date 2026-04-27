import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Forside" },
  { href: "/retsomraader", label: "Retsområder" },
  { href: "/om-os", label: "Om Os" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/privatlivspolitik", label: "Privatlivspolitik" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* 3-column grid — collapses to 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Column 1: Address + CVR */}
          <div>
            <p className="font-heading text-lg font-semibold mb-4">
              MidtAdvokaterne A/S
            </p>
            <address className="not-italic text-sm leading-relaxed text-white/70">
              Sieferts Plads 5<br />
              7430 Ikast<br />
              <br />
              {/* TODO: replace with real CVR number before launch */}
              CVR: 12345678
            </address>
          </div>

          {/* Column 2: Navigation links */}
          <nav aria-label="Footer navigation">
            <p className="font-heading text-lg font-semibold mb-4">Navigation</p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-amber transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Opening hours + contact */}
          <div>
            <p className="font-heading text-lg font-semibold mb-4">Åbningstider</p>
            <div className="text-sm text-white/70 space-y-1 mb-6">
              <p>Mandag – torsdag: 8:00–16:30</p>
              <p>Fredag: 8:00–15:00</p>
            </div>
            {/* TODO: replace with real phone number before launch */}
            <a
              href="tel:97152233"
              className="text-amber font-semibold text-sm hover:text-white transition-colors duration-200"
            >
              97 15 22 33
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© {year} MidtAdvokaterne A/S. Alle rettigheder forbeholdes.</span>
          <Link
            href="/privatlivspolitik"
            className="hover:text-white/70 transition-colors duration-200"
          >
            Privatlivspolitik
          </Link>
        </div>
      </div>
    </footer>
  );
}
