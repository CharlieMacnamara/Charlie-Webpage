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
  description: 'Selected works in technical writing and API documentation.',
  path: '/portfolio'
})

export default function Portfolio() {
  return (
    <SimpleLayout
      title="Selected Works"
      intro="Showcasing technical writing and documentation that makes complex concepts clear and engaging."
    >
      <ReferenceNote>
        EVORA Global's system used a single account. Articles are published under Matt Matthias, my manager and reference on my resume.
      </ReferenceNote>
      
      <div className="mt-16 space-y-20">
        <PortfolioSection title="Featured Technical Articles">
          <ProjectCard
            href="https://www.honeybadger.io/blog/dockerize-django-preact-postgres/"
            title="How to Dockerize a Django, Preact, and PostgreSQL Application"
            description="A comprehensive guide to containerizing a modern full-stack application, covering everything from initial setup to production deployment. Published on Honeybadger's engineering blog."
            cta="Read Article"
          />
          <ProjectCard
            href="https://blog.roboflow.com/ffmpeg-computer-vision/"
            title="What is FFmpeg? A Guide for Computer Vision Tasks"
            description="An in-depth exploration of FFmpeg for computer vision applications, featuring practical examples and best practices. Published on Roboflow's technical blog."
            cta="Read Guide"
          />
          <ProjectCard
            href="https://transloadit.com/blog/2022/06/image-facedetect-cdn-support/"
            title="Implementing AI Face Detection in Smart CDN"
            description="Technical guide on integrating AI-powered face detection in CDN infrastructure, with implementation examples and performance considerations."
            cta="Read Article"
          />
        </PortfolioSection>

        <PortfolioSection title="API Documentation">
          <ProjectCard
            href="https://evoraglobal.github.io/sieraapi-docs/#consumption-get-consumption-summary-of-a-meter/"
            title="SIERA API Reference: Consumption Metrics"
            description="Comprehensive API documentation detailing meter consumption data analysis, including authentication flows, endpoint specifications, and response handling for the SIERA platform."
            cta="View API Docs"
          />
          <ProjectCard
            href="https://transloadit.com/docs/transcoding/document-processing/document-convert/"
            title="Document Conversion API Reference"
            description="Detailed API documentation for document conversion services, including format specifications and error handling."
            cta="Read Documentation"
          />
        </PortfolioSection>

        <PortfolioSection title="Product Documentation">
          <ProjectCard
            href="https://wisej.com/case-studies/sonepar/"
            title="Sonepar Case Study: SAP Integration Solution"
            description="Detailed case study documenting how Sonepar, the world's largest electrical wholesaler, implemented a web-based solution managing over 650 million price conditions integrated with SAP S/4HANA."
            cta="Read Case Study"
          />
          <ProjectCard
            href="https://docs.wisej.com/docs/releases/whats-new-in-3.0"
            title="Wisej.NET 3.0 Release Documentation"
            description="Comprehensive release documentation covering new features, migration guidelines, and breaking changes for the major platform update."
            cta="View Release Notes"
          />
          <ProjectCard
            href="https://www.youtube.com/watch?v=yj36Ki0V2MI&t=207s/"
            title="Visual Studio Integration Guide"
            description="Video tutorial demonstrating the setup and configuration of Wisej.NET in Visual Studio, with practical examples and implementation tips."
            cta="Watch Tutorial"
          />
        </PortfolioSection>

        <PortfolioSection title="Implementation Guides">
          <ProjectCard
            href="https://sieraglobal.zendesk.com/hc/en-gb/articles/12958180083229-Currency-Conversion"
            title="Currency Conversion Implementation Guide"
            description="Technical documentation explaining SIERA's currency conversion system, including integration with fixer.io API, automated rate calculations, and implementation details for GBP, EUR, and USD transitions."
            cta="View Guide"
          />
          <ProjectCard
            href="https://sieraglobal.zendesk.com/hc/en-gb/articles/11107134286877-Gap-Filling-Methodology/"
            title="Data Gap Analysis Methodology"
            description="Technical guide explaining the methodology for identifying and addressing data gaps in environmental metrics collection, including automated detection and resolution procedures."
            cta="View Guide"
          />
          <ProjectCard
            href="https://charliewebsite.s3.eu-west-2.amazonaws.com/email-example.pdf/"
            title="Technical Feature Announcement"
            description="Clear and concise announcement of new Wisej.NET features targeting developer audience."
            cta="View Example"
          />
        </PortfolioSection>
      </div>
    </SimpleLayout>
  )
}
