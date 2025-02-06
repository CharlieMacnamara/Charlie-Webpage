'use client'

import { createContext, useEffect, useRef, memo, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'

const usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const ThemeWatcher = memo(function ThemeWatcher() {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      const systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
})

export const AppContext = createContext(undefined)

const MemoizedThemeProvider = memo(function MemoizedThemeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <ThemeWatcher />
      {children}
    </ThemeProvider>
  )
})

export function Providers({ children }) {
  const pathname = usePathname()
  const previousPathname = usePrevious(pathname)
  
  const contextValue = useMemo(() => ({ previousPathname }), [previousPathname])

  return (
    <AppContext.Provider value={contextValue}>
      <MemoizedThemeProvider>
        {children}
      </MemoizedThemeProvider>
    </AppContext.Provider>
  )
}
