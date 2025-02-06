'use client'

import { memo } from 'react'
import ReactPlayer from 'react-player'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'

const DynamicReactPlayer = dynamic(() => import('react-player'), {
  loading: () => (
    <div 
      className="w-full h-64 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg" 
      aria-label="Loading media player..."
    />
  ),
  ssr: false
})

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

export const DynamicPlayer = memo(function DynamicPlayer({ mediaUrl, mediaType }) {
  const isVideo = mediaType === 'video'
  const isAudio = mediaType === 'audio'
  const mediaLabel = isVideo ? 'Video player' : isAudio ? 'Audio player' : 'Media player'

  return (
    <div role="region" aria-label={mediaLabel}>
      <DynamicReactPlayer
        url={mediaUrl}
        playing={false}
        controls={true}
        width="100%"
        height="auto"
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
              preload: 'metadata',
              'aria-label': mediaLabel
            }
          }
        }}
      />
    </div>
  )
})

export const ArticleLayout = memo(function ArticleLayout({ children, article, isRssFeed = false }) {
  const router = useRouter()
  const { previousPathname } = useContext(AppContext)

  if (isRssFeed) {
    return children
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Return to previous page"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {article.title}
              </h1>
              <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                aria-label={`Published on ${formatDate(article.date)}`}
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" aria-hidden="true" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
            </header>
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
})
