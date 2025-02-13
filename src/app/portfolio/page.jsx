import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { generateMetadata } from '@/components/SEO'

function PortfolioSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </Section>
  )
}

function ProjectCard({ title, description, event, cta, href }) {
  return (
    <Card as="article" className="flex h-full flex-col justify-between">
      <div>
        <Card.Title as="h3" href={href}>
          {title}
        </Card.Title>
        <Card.Description>{description}</Card.Description>
      </div>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

function ReferenceNote({ children }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span>⚠️ Note on EVORA Global Articles</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {children}
      </p>
    </div>
  )
}

export const metadata = generateMetadata({
  title: 'Portfolio',
  description: 'Selected Technical Writing.',
  path: '/portfolio'
})

export default function Portfolio() {
  return (
    <SimpleLayout
      title="Selected Works"
      intro={
        <>
          Technical Writing means you wear many hats. At one point, I was designing Shopify mugs...
          <br /><br />
          Here's some selected varied work. For extra examples, feel free to reach out.
        </>
      }
    >
      <div className="space-y-20">
        <ReferenceNote>
          Zendesk articles were published under Matt Mattias due to EVORA's single-user configuration. Matt's a resume reference and former manager. Please check on reference request.
        </ReferenceNote>
        <PortfolioSection title="Technical Blog Posts">
          <ProjectCard
            href="https://transloadit.com/blog/2022/06/image-facedetect-cdn-support/"
            title="Implementing AI Face Detection in Smart CDN"
            description="Technical guide on integrating AI face detection in CDN infrastructure."
            cta="View"
          />
          <ProjectCard
            href="https://transloadit.com/blog/2022/05/geolocation-watermark/"
            title="Building a Geolocation Image Watermarker"
            description="Tutorial combining APIs to create location-based image processing."
            cta="View"
          />
          <ProjectCard
            href="https://configcat.com/blog/2020/07/08/introduction-to-configcat-api/"
            title="Deep Dive: ConfigCat Public Management API"
            description="Comprehensive guide to the ConfigCat Management API."
            cta="View"
          />
        </PortfolioSection>

        <PortfolioSection title="Technical Documentation">
          <ProjectCard
            href="https://evoraglobal.github.io/sieraapi-docs/#consumption-get-consumption-summary-of-a-meter/"
            title="SIERA API Reference: Consumption Metrics"
            description="API documentation for meter consumption data analysis."
            cta="View"
          />
          <ProjectCard
            href="https://transloadit.com/docs/transcoding/document-processing/document-convert/"
            title="Document Conversion API Reference"
            description="Guide to document conversion API with implementation examples."
            cta="View"
          />
          <ProjectCard
            href="https://sieraglobal.zendesk.com/hc/en-gb/articles/11107134286877-Gap-Filling-Methodology/"
            title="Data Gap Analysis Methodology"
            description="Technical guide on identifying and addressing data gaps in environmental metrics."
            cta="View"
          />
          <ProjectCard
            href="https://docs.wisej.com/docs/releases/whats-new-in-3.0"
            title="Wisej.NET 3.0 Release Documentation"
            description="Release documentation covering new features and migration guidelines."
            cta="View"
          />
        </PortfolioSection>

        <PortfolioSection title="Technical Content">
          <ProjectCard
            href="https://www.youtube.com/watch?v=yj36Ki0V2MI&t=207s/"
            title="Wisej.NET Visual Studio Integration Guide"
            description="Video guide on setting up Wisej.NET in Visual Studio."
            cta="Watch"
          />
         <ProjectCard
            href="https://transloadit.com/demos/video-encoding/encode-blurout-effect/"
            title="Advanced Video Processing with FFmpeg"
            description="Technical Demo on implementing complex video effects using FFmpeg."
            cta="View"
          />
        </PortfolioSection>
      </div>
    </SimpleLayout>
  )
}
