import { memo } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const Background = memo(function Background() {
  return (
    <div className="fixed inset-0 flex justify-center sm:px-8">
      <div className="flex w-full max-w-7xl lg:px-8">
        <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
      </div>
    </div>
  )
})

const Content = memo(function Content({ children }) {
  return (
    <div className="relative flex w-full flex-col">
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  )
})

export const Layout = memo(function Layout({ children }) {
  return (
    <>
      <Background />
      <Content>{children}</Content>
    </>
  )
})
