'use client'

import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { href: '/', label: 'Forside' },
  { href: '/retsomraader', label: 'Retsområder' },
  { href: '/om-os', label: 'Om Os' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)
  })

  const tx = shouldReduceMotion ? '' : 'transition-all duration-300'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${tx} ${
        scrolled
          ? 'bg-off-white shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo image — inverted white on dark hero, natural on light bg */}
        <Link href="/" aria-label="MidtAdvokaterne — gå til forsiden">
          <Image
            src="/images/brand/logo.png"
            alt="MidtAdvokaterne"
            width={200}
            height={48}
            className={`h-10 w-auto object-contain ${tx}`}
            style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primær navigation" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                font-body text-xs uppercase tracking-[0.18em] px-4 py-2
                border border-transparent
                hover:border-current/20
                ${tx}
                ${scrolled ? 'text-navy/70 hover:text-navy' : 'text-off-white/75 hover:text-off-white'}
              `}
            >
              {label}
            </Link>
          ))}

          {/* Kontakt — always a filled box */}
          <Link
            href="/kontakt"
            className={`
              font-body text-xs uppercase tracking-[0.18em] px-5 py-2 ml-3
              ${tx}
              ${scrolled
                ? 'bg-navy text-off-white hover:bg-navy/85'
                : 'bg-off-white/15 text-off-white border border-off-white/30 hover:bg-off-white/25'
              }
            `}
          >
            Kontakt
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Luk menu' : 'Åbn menu'}
          aria-expanded={menuOpen}
          className={`md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 ${
            scrolled ? 'text-navy' : 'text-off-white'
          }`}
        >
          <span className={`block w-5 h-px bg-current ${tx} ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-px bg-current ${tx} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-current ${tx} ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        links={[...NAV_LINKS, { href: '/kontakt', label: 'Kontakt' }]}
        onLinkClick={() => setMenuOpen(false)}
      />
    </header>
  )
}
