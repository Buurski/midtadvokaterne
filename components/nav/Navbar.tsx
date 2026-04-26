'use client'

import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
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
    setScrolled(latest > 80)
  })

  const transitionClass = shouldReduceMotion ? '' : 'transition-all duration-300'

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        ${transitionClass}
        ${scrolled
          ? 'bg-navy text-white shadow-md'
          : 'bg-transparent text-white'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo wordmark */}
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-wide"
          aria-label="MidtAdvokaterne — gå til forsiden"
        >
          MidtAdvokaterne
        </Link>

        {/* Desktop nav links */}
        <nav aria-label="Primær navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium hover:text-amber transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Luk menu' : 'Åbn menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
        >
          <span
            className={`block w-6 h-0.5 bg-current ${transitionClass} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current ${transitionClass} ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current ${transitionClass} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <MobileMenu
        isOpen={menuOpen}
        links={NAV_LINKS}
        onLinkClick={() => setMenuOpen(false)}
      />
    </header>
  )
}
