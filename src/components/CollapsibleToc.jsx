'use client'

import { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

// Client-side only component to avoid hydration issues
export default function ClientToc({ children }) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return (
      <div className="my-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Table of Contents</h2>
        <div className="h-20 bg-gray-50"></div>
      </div>
    )
  }
  
  return children
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function CollapsibleTocSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const sectionId = slugify(title)

  const handleClick = (e) => {
    e.preventDefault()
    if (typeof window === 'undefined') return
    
    try {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        })
      }
    } catch (error) {
      console.error('Error scrolling to section:', error)
    }
  }

  return (
    <div className="mb-2">
      <div className="group flex w-full items-center justify-between py-2 text-left text-sm font-medium text-gray-900">
        <a 
          href={`#${sectionId}`}
          onClick={handleClick}
          className="transition-colors duration-200 hover:text-teal-500"
        >
          {title}
        </a>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="ml-2 flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        >
          <ChevronDownIcon
            className={clsx(
              'h-4 w-4 transition-transform duration-200',
              isOpen ? 'rotate-180 transform' : ''
            )}
          />
          <span className="sr-only">Toggle section</span>
        </button>
      </div>
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

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      // Use a timeout to ensure DOM is fully available
      const timer = setTimeout(() => {
        const headings = Array.from(document.querySelectorAll('h2, h3'))
        const groupedSections = []
        let currentSection = null

        headings.forEach((heading) => {
          const title = heading.textContent
          if (!title || title === 'Table of Contents') return

          const id = slugify(title)
          
          // Set ID directly on the heading element
          if (!heading.id) {
            heading.id = id
          }

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
      }, 100)

      return () => clearTimeout(timer)
    } catch (error) {
      console.error('Error processing headings:', error)
      return []
    }
  }, [])

  return (
    <ClientToc>
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
                  
                  try {
                    const element = document.getElementById(subsection.id)
                    if (element) {
                      const offset = 80
                      const elementPosition = element.getBoundingClientRect().top + window.scrollY
                      window.scrollTo({
                        top: elementPosition - offset,
                        behavior: 'smooth'
                      })
                    }
                  } catch (error) {
                    console.error('Error scrolling to subsection:', error)
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
    </ClientToc>
  )
} 