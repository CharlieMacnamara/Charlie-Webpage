import { Suspense } from 'react'
import { generateMetadata } from '@/components/SEO'
import { ClientArticles } from './ClientArticles'
import { getAllArticles } from '@/lib/getAllArticles'

export const metadata = generateMetadata({
  title: 'Non-work Blog',
  description: 'Thoughts beyond my professional work. Dives into movies, tech, and personal projects.',
  path: '/blog'
})

export default async function ArticlesIndex() {
  const articles = await getAllArticles()
  
  return (
    <ClientArticles initialArticles={articles} />
  )
}
