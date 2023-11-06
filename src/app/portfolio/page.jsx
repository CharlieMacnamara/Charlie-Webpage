import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event, cta, href }) {
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

export const metadata = {
  title: 'Portfolio',
  description:
    'I’ve done too much stuff.',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="I’ve done too much stuff."
      intro="Rather than overwhelm you with an exhaustive list of similar pieces, I've chosen a selection of my work from previous jobs that best displays my talents and capabilities. For more examples of specific types of content please reach out at my email."
    >
      <div className="space-y-20">
      <SpeakingSection title="Blogs/Demos">
          <Appearance
            href="https://transloadit.com/blog/2022/06/image-facedetect-cdn-support/"
            title="Our Smart CDN now supports AI Face Detection!"
            description="Feature announcement blog."
            cta="View"
          />
          <Appearance
            href="https://transloadit.com/blog/2022/05/geolocation-watermark/"
            title="Let’s Build: Geolocation image watermarker"
            description="A demonstration of how to integrate multiple APIs seamlessly with Transloadit's product. (including a photo from my favourite city)"
            cta="View"
          />
          <Appearance
            href="https://configcat.com/blog/2020/07/08/introduction-to-configcat-api/"
            title="Getting acquainted with the ConfigCat Public Management API"
            description="A technical deep-dive into an updated piece of software."
            cta="View"
          />
          <Appearance
            href="https://transloadit.com/demos/video-encoding/encode-blurout-effect/"
            title="Encode blur-out effect into video file"
            description="Using additional FFmpeg flags demonstration."
            cta="View"
          />
      </SpeakingSection>
      <SpeakingSection title="Documentation">
        <Appearance
            href="https://evoraglobal.github.io/sieraapi-docs/#consumption-get-consumption-summary-of-a-meter/"
            title="Get Consumption Summary of a Meter"
            description="API documentation for SIERA."
            cta="View"
          />
          <Appearance
            href="https://transloadit.com/docs/transcoding/document-processing/document-convert/"
            title="/document/convert Robot Documentation"
            description="Feature documentation for use with Transloadit API."
            cta="View"
          />
          <Appearance
            href="https://sieraglobal.zendesk.com/hc/en-gb/articles/11107134286877-Gap-Filling-Methodology/"
            title="Gap Filling Mehtodology"
            description="Explaining sector specific information."
            cta="View"
          />
          <Appearance
            href="https://docs.wisej.com/docs/releases/whats-new-in-3.0"
            title="Wisej.NET 3.0"
            description="A comprehensive document that thoroughly details all the changes introduced with a major version release."
            event="The Escape Velocity Show, March 2022"
            cta="Listen to podcast"
          />
      </SpeakingSection>
      <SpeakingSection title="Miscellaneous">
      <Appearance
            href="https://www.youtube.com/watch?v=yj36Ki0V2MI&t=207s/"
            title="Installing Wisej.NET for Visual Studio "
            description="Video demoing how to install and use a service."
            cta="View"
          />
          <Appearance
            href="https://charliewebsite.s3.eu-west-2.amazonaws.com/email-example.pdf/"
            title="Wisej.NET service email"
            description="An example of publishing a quick feature announcment via email."
            cta="View"
          />
      </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
