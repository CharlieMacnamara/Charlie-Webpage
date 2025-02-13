import { Providers } from './providers'
import { ClientLayout } from '@/components/ClientLayout'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Charlie Macnamara',
    default: 'Charlie Macnamara - Technical Writer',
  },
  description: 'Technical writer making systems and concepts clear and accessible.',
  metadataBase: new URL('https://charliemacnamara.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Charlie Macnamara',
    description: 'Technical writer making systems and concepts clear and accessible.',
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
      <body className="flex h-full bg-zinc-50/80 dark:bg-black font-['Trebuchet_MS',_sans-serif]" suppressHydrationWarning>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  )
}