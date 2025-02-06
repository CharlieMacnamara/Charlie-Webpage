import { memo } from 'react'
import clsx from 'clsx'

export const Prose = memo(function Prose({ className, as: Component = 'div', ...props }) {
  return (
    <Component 
      className={clsx(
        className,
        'prose dark:prose-invert',
        // Base styles
        'prose-zinc max-w-none',
        'prose-headings:scroll-mt-28 prose-headings:font-display',
        
        // Heading styles
        'prose-h1:text-4xl prose-h1:font-bold',
        'prose-h2:text-3xl prose-h2:font-semibold prose-h2:tracking-tight',
        'prose-h3:text-2xl prose-h3:font-medium',
        'prose-h4:text-xl prose-h4:font-medium',
        
        // Text styles
        'prose-p:text-zinc-600 dark:prose-p:text-zinc-400',
        'prose-a:font-semibold prose-a:text-teal-500 hover:prose-a:text-teal-600',
        'dark:prose-a:text-teal-400 dark:hover:prose-a:text-teal-300',
        'prose-strong:font-semibold prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100',
        
        // Code styles
        'prose-code:text-zinc-900 prose-code:font-medium dark:prose-code:text-zinc-100',
        'prose-pre:rounded-2xl prose-pre:bg-zinc-900 prose-pre:shadow-lg',
        'dark:prose-pre:bg-zinc-800/80 dark:prose-pre:shadow-none',
        
        // List styles
        'prose-ul:list-disc prose-ul:pl-4',
        'prose-ol:list-decimal prose-ol:pl-4',
        'prose-li:text-zinc-600 dark:prose-li:text-zinc-400',
        
        // Image styles
        'prose-img:rounded-2xl prose-img:shadow-lg',
        'dark:prose-img:shadow-none',
        
        // Quote styles
        'prose-blockquote:border-l-2 prose-blockquote:border-zinc-300',
        'prose-blockquote:pl-4 prose-blockquote:italic',
        'dark:prose-blockquote:border-zinc-600/40',
        
        // Table styles
        'prose-table:text-sm',
        'prose-th:font-semibold prose-th:text-zinc-900 dark:prose-th:text-zinc-100',
        'prose-td:align-baseline'
      )}
      {...props}
    />
  )
})
