import { generateMetadata } from '@/components/SEO'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/getAllArticles'

export const metadata = generateMetadata({
  title: 'Non-work Blog',
  description: 'Thoughts beyond my professional work. Dives into movies, tech, and personal projects.',
  path: '/blog'
})

// Force static generation
export const dynamic = 'force-static'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
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
}

export default function ArticlesIndex() {
  const articles = getAllArticles()
  
  return (
    <SimpleLayout
      title="Non-work Writing"
      intro="Thoughts beyond work: movies, tech, personal projects. That sort."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
