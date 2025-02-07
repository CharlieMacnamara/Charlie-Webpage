const defaultMetadata = {
  title: 'Charlie Macnamara - Technical Writer',
  description: 'Technical writer making complex APIs and systems accessible through clear documentation.',
  siteUrl: 'https://charliemacnamara.com',
  siteName: 'Charlie Macnamara',
  locale: 'en_GB',
  type: 'website',
  twitterHandle: '@charliemacnamara',
  keywords: [
    'Technical Writing',
    'API Documentation',
    'SDK Documentation',
    'Developer Experience',
    'Documentation',
    'Web Development',
    'Technical Content',
    'Developer Tools'
  ],
}

export function generateMetadata({
  title,
  description = defaultMetadata.description,
  path = '',
  type = defaultMetadata.type,
  date,
  images = [],
  keywords = defaultMetadata.keywords,
}) {
  const url = `${defaultMetadata.siteUrl}${path}`
  const fullTitle = title 
    ? `${title} - ${defaultMetadata.siteName}`
    : defaultMetadata.title

  return {
    title: {
      template: '%s - Charlie Macnamara | Technical Writer',
      default: fullTitle,
    },
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(defaultMetadata.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: defaultMetadata.siteName,
      locale: defaultMetadata.locale,
      type,
      ...(date && { 
        publishedTime: date,
        modifiedTime: date, 
      }),
      ...(images.length > 0 && {
        images: images.map(image => ({
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.alt || 'Article featured image',
        })),
      }),
    },
    twitter: {
      card: images.length > 0 ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      creator: defaultMetadata.twitterHandle,
      site: defaultMetadata.twitterHandle,
      ...(images.length > 0 && { 
        images: images.map(image => image.url),
        image: {
          alt: images[0]?.alt || 'Article featured image'
        }
      }),
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
    authors: [{ name: 'Charlie Macnamara' }],
  }
} 