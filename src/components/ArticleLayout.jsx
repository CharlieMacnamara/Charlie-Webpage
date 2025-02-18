import { memo } from 'react'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import { MDXContent } from '@/components/MDXContent'

const ArrowLeftIcon = memo(function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

export const ArticleLayout = memo(function ArticleLayout({ children, article, isRssFeed = false }) {
  if (isRssFeed) {
    return children
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="relative mx-auto max-w-3xl">
        <Link
          href="/blog"
          aria-label="Return to blog"
          className="group absolute -left-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition hover:shadow-lg dark:bg-zinc-800 dark:ring-white/10 dark:hover:ring-white/20 sm:-left-6 lg:-left-8"
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 dark:group-hover:stroke-zinc-300" />
        </Link>

        <article className="relative">
          <header className="space-y-6 border-b border-zinc-200 pb-8 dark:border-zinc-700/40">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {article.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm">
                <time
                  dateTime={article.date}
                  className="flex items-center text-zinc-500 dark:text-zinc-400"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDate(article.date)}</span>
                </time>
                {article.readingTime && (
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {article.readingTime} min read
                  </span>
                )}
              </div>
            </div>
            {article.description && (
              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                {article.description}
              </p>
            )}
          </header>

          <Prose className="mt-8 sm:mt-10">
            <MDXContent>{children}</MDXContent>
          </Prose>
        </article>
      </div>
    </Container>
  )
})
