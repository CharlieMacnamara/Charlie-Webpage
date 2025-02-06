import { memo } from 'react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

const NotFound = memo(function NotFound() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500" aria-label="Error code">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          href="/" 
          variant="secondary" 
          className="mt-4"
          aria-label="Return to homepage"
        >
          Return to Homepage
        </Button>
      </div>
    </Container>
  )
})

export default NotFound
