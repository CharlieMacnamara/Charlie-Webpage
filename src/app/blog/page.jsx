import { Suspense } from 'react'
import { generateMetadata } from '@/components/SEO'
import { ClientArticles } from './ClientArticles'
import { getAllArticles } from '@/lib/getAllArticles'

export const metadata = generateMetadata({
  title: 'Blog',
  description: 'Thoughts beyond professional work.',
  path: '/blog'
})

export default async function ArticlesIndex() {
  const articles = await getAllArticles()
  
  return (
    <ClientArticles initialArticles={articles} />
  )
}
