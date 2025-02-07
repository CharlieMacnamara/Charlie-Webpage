import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Layout } from '@/components/Layout'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import PerformanceMonitor from '@/components/PerformanceMonitor'

import '@/styles/tailwind.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    template: '%s - Charlie Macnamara',
    default: 'Charlie Macnamara - Technical Writer',
  },
  description: 'Technical writer specializing in API documentation and clear technical content.',
  metadataBase: new URL('https://charliemacnamara.com'),
  openGraph: {
    title: 'Charlie Macnamara',
    description: 'Technical writer specializing in API documentation and clear technical content.',
    url: 'https://charliemacnamara.com',
    siteName: 'Charlie Macnamara',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Charlie Macnamara',
    card: 'summary_large_image',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`flex h-full bg-zinc-50 dark:bg-black ${inter.className}`}>
        <ErrorBoundary>
          <Providers>
            <PerformanceMonitor />
            <div className="flex w-full">
              <Layout>{children}</Layout>
            </div>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}