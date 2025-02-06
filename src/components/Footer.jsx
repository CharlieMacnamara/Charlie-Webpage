import { memo } from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'

const NavLink = memo(function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
      aria-label={`Visit ${children} page`}
    >
      {children}
    </Link>
  )
})

const Navigation = memo(function Navigation() {
  return (
    <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
      <NavLink href="/about">About Me</NavLink>
      <NavLink href="/blog">Technical Blog</NavLink>
      <NavLink href="/portfolio">Portfolio & Projects</NavLink>
    </nav>
  )
})

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-32 flex-none" role="contentinfo" aria-label="Site footer">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <Navigation />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                © {currentYear} Charlie Macnamara. All rights reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
})
