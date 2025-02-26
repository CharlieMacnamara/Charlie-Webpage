'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function CollapsibleTocSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const sectionId = slugify(title)

  const handleClick = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (typeof window === 'undefined') return
    
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }, [sectionId])

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-2 text-left text-sm font-medium text-gray-900"
      >
        <a 
          href={`#${sectionId}`}
          onClick={handleClick}
          className="transition-colors duration-200 hover:text-teal-500"
        >
          {title}
        </a>
        <ChevronDownIcon
          className={clsx(
            'h-5 w-5 text-gray-400 transition-all duration-200',
            'group-hover:text-gray-600',
            isOpen ? 'rotate-180 transform' : ''
          )}
        />
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-200 ease-in-out',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="pl-4 pb-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export function TableOfContents() {
  const [sections, setSections] = useState([])
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    
    // Only run this on the client
    if (typeof window === 'undefined') return
    
    // Client-side only: find and process headings
    const processHeadings = () => {
      try {
        const headings = Array.from(document.querySelectorAll('h2, h3'))
        const groupedSections = []
        let currentSection = null

        headings.forEach((heading) => {
          const title = heading.textContent
          if (!title || title === 'Table of Contents') return

          const id = slugify(title)
          heading.id = id

          if (heading.tagName.toLowerCase() === 'h2') {
            if (currentSection) {
              groupedSections.push(currentSection)
            }
            currentSection = {
              title,
              id,
              subsections: []
            }
          } else if (currentSection && heading.tagName.toLowerCase() === 'h3') {
            currentSection.subsections.push({
              title,
              id
            })
          }
        })

        if (currentSection) {
          groupedSections.push(currentSection)
        }

        setSections(groupedSections)
      } catch (error) {
        console.error('Error processing headings:', error)
      }
    }

    // Add a small delay to ensure DOM is fully available
    const timer = setTimeout(() => {
      processHeadings()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Don't render anything during SSR
  if (!hasMounted) {
    return (
      <nav className="my-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Table of Contents</h2>
        <div className="h-20"></div>
      </nav>
    )
  }

  return (
    <nav className="my-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Table of Contents</h2>
      
      {sections.map((section) => (
        <CollapsibleTocSection 
          key={section.id} 
          title={section.title}
        >
          {section.subsections.map((subsection) => (
            <a
              key={subsection.id}
              href={`#${subsection.id}`}
              onClick={(e) => {
                e.preventDefault()
                if (typeof window === 'undefined') return
                
                const element = document.getElementById(subsection.id)
                if (element) {
                  const offset = 80
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY
                  window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                  })
                }
              }}
              className="block py-1 text-sm text-gray-600 transition-colors duration-200 hover:text-teal-500 pl-4"
            >
              {subsection.title}
            </a>
          ))}
        </CollapsibleTocSection>
      ))}
    </nav>
  )
} 