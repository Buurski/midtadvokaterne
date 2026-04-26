'use client'

import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { href: '/', label: 'Forside' },
  { href: '/retsomraader', label: 'Retsområder' },
  { href: '/om-os', label: 'Om Os' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  const tx = shouldReduceMotion ? '' : 'transition-all duration-300'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${tx} ${
        scrolled ? 'bg-navy/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-14 h-[72px] flex items-center justify-between">

        {/* Text logo — always white, amber separator dot */}
        <Link
          href="/"
          aria-label="MidtAdvokaterne — gå til forsiden"
          className="font-body font-medium text-[15px] tracking-[-0.01em] text-white hover:text-white/80 transition-colors"
        >
          Midt<span className="text-amber font-bold">·</span>Advokaterne
        </Link>

        {/* Desktop nav — white links, no decoration */}
        <nav aria-label="Primær navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-body text-sm text-white/70 hover:text-white ${tx}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Luk menu' : 'Åbn menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] text-white"
        >
          <span className={`block w-5 h-px bg-current ${tx} ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-current ${tx} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-current ${tx} ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        links={NAV_LINKS}
        onLinkClick={() => setMenuOpen(false)}
      />
    </header>
  )
}
