'use client'

import { Suspense, memo } from 'react'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Loading } from '@/components/Loading'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useArticles } from '@/hooks/useArticles'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { generateMetadata } from '@/components/SEO'
import { formatDate } from '@/lib/formatDate'

const Article = memo(function Article({ article, isLast, lastElementRef }) {
  const articleRef = isLast ? lastElementRef : null

  return (
    <article 
      ref={articleRef}
      className="md:grid md:grid-cols-4 md:items-baseline"
    >
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
})

const ArticlesList = memo(function ArticlesList() {
  const { articles, isLoading: isLoadingArticles, error, refetch } = useArticles()
  const {
    displayedItems,
    isLoading: isLoadingMore,
    hasMore,
    lastElementRef,
  } = useInfiniteScroll({
    items: articles,
    itemsPerPage: 5,
  })

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load articles"
        message={error}
        retry={refetch}
        className="mx-auto max-w-3xl"
      />
    )
  }

  if (!articles?.length && !isLoadingArticles) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-600 dark:text-zinc-400">No articles found.</p>
      </div>
    )
  }

  return (
    <div className="flex max-w-3xl flex-col space-y-16">
      {displayedItems.map((article, index) => (
        <Article 
          key={article.slug} 
          article={article}
          isLast={index === displayedItems.length - 1}
          lastElementRef={lastElementRef}
        />
      ))}
      {isLoadingMore && (
        <div className="py-4 text-center">
          <Loading size="sm" text="Loading more articles..." />
        </div>
      )}
      {!hasMore && articles.length > 0 && (
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          No more articles to load
        </p>
      )}
    </div>
  )
})

export const metadata = generateMetadata({
  title: 'Technical Blog',
  description: 'Insights on API documentation, technical writing, web development, and software engineering. Practical guides and industry perspectives from a technical writer and developer.',
  path: '/blog'
})

function ArticlesLoading() {
  return (
    <div className="flex justify-center py-12">
      <Loading text="Loading articles..." />
    </div>
  )
}

export default function ArticlesIndex() {
  return (
    <SimpleLayout
      title="Technical Writing & Development Insights"
      intro="Exploring the intersection of technical writing, API documentation, and software development. Here, I share practical guides, industry insights, and lessons learned from my experience in making complex technical concepts accessible and engaging."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <Suspense fallback={<ArticlesLoading />}>
          <ArticlesList />
        </Suspense>
      </div>
    </SimpleLayout>
  )
}
