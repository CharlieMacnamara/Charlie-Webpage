import { Suspense } from 'react'
import { generateMetadata } from '@/components/SEO'
import { ClientArticles } from './ClientArticles'
import { getAllArticles } from '@/lib/getAllArticles'

export const metadata = generateMetadata({
  title: 'Technical Blog',
  description: 'Practical insights on technical writing, documentation, and software development.',
  path: '/blog'
})

export default async function ArticlesIndex() {
  const articles = await getAllArticles()
  
  return (
    <ClientArticles initialArticles={articles} />
  )
}
