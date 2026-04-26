'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

interface NavLink {
  href: string
  label: string
}

interface MobileMenuProps {
  isOpen: boolean
  links: NavLink[]
  onLinkClick: () => void
}

export function MobileMenu({ isOpen, links, onLinkClick }: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants = shouldReduceMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          {...variants}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          aria-label="Mobil navigation"
          className="bg-navy px-6 py-8 md:hidden"
        >
          <ul className="flex flex-col gap-6">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onLinkClick}
                  className="text-white text-lg font-medium hover:text-amber transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
