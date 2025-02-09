import { memo } from 'react'

export const MDXContent = memo(function MDXContent({ children }) {
  return (
    <div className="prose dark:prose-invert">
      {children}
    </div>
  )
}) 