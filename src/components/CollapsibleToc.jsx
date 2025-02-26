'use client'

import { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

// Client component that completely avoids any server rendering
export default function ClientToc({children}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="mt-0 mb-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
        <div className="h-5 w-36 bg-gray-200 mb-3 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }
  
  return children
}

// Utility function to create slug IDs from text
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Create a simplified, error-resistant TOC component
export function TableOfContents() {
  const [sections, setSections] = useState([])
  const [mounted, setMounted] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})
  
  useEffect(() => {
    setMounted(true)
    
    try {
      // Ensure we're in the browser
      if (typeof window === 'undefined') return
      
      // Function to process headings
      const processHeadings = () => {
        const headings = Array.from(document.querySelectorAll('h2, h3'))
        if (!headings || headings.length === 0) return
        
        const processedSections = []
        let currentSection = null
        
        for (const heading of headings) {
          const title = heading.textContent || ''
          if (!title || title === 'Table of Contents') continue
          
          const id = heading.id || slugify(title)
          if (!heading.id) heading.id = id
          
          if (heading.tagName === 'H2') {
            if (currentSection) processedSections.push(currentSection)
            currentSection = { title, id, subsections: [] }
          } else if (heading.tagName === 'H3' && currentSection) {
            currentSection.subsections.push({ title, id })
          }
        }
        
        if (currentSection) processedSections.push(currentSection)
        
        setSections(processedSections)
        
        // Initialize expanded state for day sections
        const initialExpandedState = {}
        processedSections.forEach(section => {
          if (section.title.toLowerCase().includes('day')) {
            initialExpandedState[section.id] = true  // Start expanded
          }
        })
        setExpandedSections(initialExpandedState)
      }
      
      // Process headings after a small delay to ensure DOM is ready
      const timer = setTimeout(processHeadings, 100)
      return () => clearTimeout(timer)
    } catch (error) {
      console.error('Error in TOC generation:', error)
    }
  }, [])
  
  // Show placeholder during SSR/mounting
  if (!mounted) {
    return (
      <div className="mt-0 mb-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
        <div className="h-5 w-36 bg-gray-200 mb-3 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }
  
  // Don't render anything if no sections found
  if (!sections || sections.length === 0) {
    return null
  }
  
  // Function for smooth scrolling
  const handleClick = (e, id) => {
    e.preventDefault()
    try {
      const element = document.getElementById(id)
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
  
  // Function to toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }
  
  // Check if a section title contains "Day"
  const isDaySection = (title) => {
    return title.toLowerCase().includes('day')
  }
  
  return (
    <nav className="mt-0 mb-6 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <h2 className="mb-3 text-base font-semibold text-gray-900">Table of Contents</h2>
      
      <div className="space-y-1">
        {sections.map((section) => {
          const isDay = isDaySection(section.title)
          const isExpanded = isDay ? expandedSections[section.id] : true
          
          return (
            <div key={section.id} className="mb-1">
              <div className="flex items-center">
                {isDay && (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="mr-1 p-0.5 text-gray-500 hover:text-teal-500 focus:outline-none"
                    aria-label={isExpanded ? `Collapse ${section.title}` : `Expand ${section.title}`}
                  >
                    {isExpanded ? (
                      <ChevronDownIcon className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRightIcon className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleClick(e, section.id)}
                  className="block py-0.5 text-sm font-medium text-gray-900 hover:text-teal-500"
                >
                  {section.title}
                </a>
              </div>
              
              {isExpanded && section.subsections.length > 0 && (
                <div className="ml-4 mt-0.5 space-y-0.5">
                  {section.subsections.map((subsection) => (
                    <a
                      key={subsection.id}
                      href={`#${subsection.id}`}
                      onClick={(e) => handleClick(e, subsection.id)}
                      className="block py-0.5 text-sm text-gray-600 hover:text-teal-500"
                    >
                      {subsection.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
} 