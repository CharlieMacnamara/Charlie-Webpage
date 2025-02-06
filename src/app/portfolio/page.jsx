import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { generateMetadata } from '@/components/SEO'

function PortfolioSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function ProjectCard({ title, description, event, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata = generateMetadata({
  title: 'Portfolio',
  description: 'Selected works showcasing technical writing, API documentation, and content strategy.',
  path: '/portfolio'
})

export default function Portfolio() {
  return (
    <SimpleLayout
      title="Selected Works and Projects"
      intro="A curated collection of my work demonstrating expertise in technical writing, API documentation, and content strategy. Each piece represents different aspects of my skills in making complex technical concepts accessible and engaging."
    >
      <div className="space-y-20">
        <PortfolioSection title="Technical Blog Posts">
          <ProjectCard
            href="https://transloadit.com/blog/2022/06/image-facedetect-cdn-support/"
            title="Implementing AI Face Detection in Smart CDN"
            description="Technical announcement showcasing the integration of `AI`-powered face detection capabilities in our CDN infrastructure."
            cta="Read Article"
          />
          <ProjectCard
            href="https://transloadit.com/blog/2022/05/geolocation-watermark/"
            title="Building a Geolocation Image Watermarker"
            description="Step-by-step tutorial demonstrating the integration of multiple `APIs` to create a location-aware image processing system."
            cta="View Tutorial"
          />
          <ProjectCard
            href="https://configcat.com/blog/2020/07/08/introduction-to-configcat-api/"
            title="Deep Dive: ConfigCat Public Management `API`"
            description="Comprehensive technical exploration of the ConfigCat Management `API`, focusing on practical implementation and best practices."
            cta="Read Guide"
          />
          <ProjectCard
            href="https://transloadit.com/demos/video-encoding/encode-blurout-effect/"
            title="Advanced Video Processing with FFmpeg"
            description="Technical demonstration of implementing complex video effects using FFmpeg's advanced features and custom parameters."
            cta="View Demo"
          />
        </PortfolioSection>

        <PortfolioSection title="Technical Documentation">
          <ProjectCard
            href="https://evoraglobal.github.io/sieraapi-docs/#consumption-get-consumption-summary-of-a-meter/"
            title="SIERA `API` Reference: Consumption Metrics"
            description="Detailed `API` documentation for meter consumption data retrieval and analysis."
            cta="View Docs"
          />
          <ProjectCard
            href="https://transloadit.com/docs/transcoding/document-processing/document-convert/"
            title="Document Conversion `API` Reference"
            description="Comprehensive guide to the document conversion `API` endpoints and implementation examples."
            cta="Read Documentation"
          />
          <ProjectCard
            href="https://sieraglobal.zendesk.com/hc/en-gb/articles/11107134286877-Gap-Filling-Methodology/"
            title="Data Gap Analysis Methodology"
            description="Technical explanation of data analysis methodologies for identifying and addressing data gaps in environmental metrics."
            cta="View Guide"
          />
          <ProjectCard
            href="https://docs.wisej.com/docs/releases/whats-new-in-3.0"
            title="Wisej.NET 3.0 Release Documentation"
            description="Comprehensive documentation covering new features, improvements, and migration guidelines for the Wisej.NET 3.0 release."
            cta="View Release Notes"
          />
        </PortfolioSection>

        <PortfolioSection title="Technical Content">
          <ProjectCard
            href="https://www.youtube.com/watch?v=yj36Ki0V2MI&t=207s/"
            title="Wisej.NET Visual Studio Integration Guide"
            description="Video tutorial demonstrating the setup and configuration of Wisej.NET in Visual Studio, with practical examples."
            cta="Watch Tutorial"
          />
          <ProjectCard
            href="https://charliewebsite.s3.eu-west-2.amazonaws.com/email-example.pdf/"
            title="Technical Feature Announcement"
            description="Concise technical communication announcing new Wisej.NET features to the developer community."
            cta="View Example"
          />
        </PortfolioSection>
      </div>
    </SimpleLayout>
  )
}
