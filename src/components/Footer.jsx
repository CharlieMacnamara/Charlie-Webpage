import { memo } from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'

const MailIcon = memo(function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
})

const SocialLink = memo(function SocialLink({ icon: Icon, href, children }) {
  return (
    <Link
      href={href}
      className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="h-5 w-5 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
      <span className="ml-2">{children}</span>
    </Link>
  )
})

const Social = memo(function Social() {
  return (
    <div className="flex gap-x-4">
      <SocialLink href="https://github.com/CharlieMacnamara" icon={GitHubIcon}>
        GitHub
      </SocialLink>
      <SocialLink href="https://www.linkedin.com/in/charliemacnamara/" icon={LinkedInIcon}>
        LinkedIn
      </SocialLink>
      <SocialLink href="mailto:mail@charliemacnamara.uk" icon={MailIcon}>
        Email
      </SocialLink>
    </div>
  )
})

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-32 flex-none" role="contentinfo" aria-label="Site footer">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6">
              <Social />
              <div className="text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  © 2023-{currentYear} Charlie Macnamara. Custom Content and Code
                </p>
                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                  <a href="https://tailwindui.com" className="text-teal-500 hover:underline">Built on <span className="text-teal-500 hover:underline">TailwindUI</span></a>
                </p>
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
})
