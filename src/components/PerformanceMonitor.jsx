'use client'

import { useEffect, memo } from 'react'

const VITAL_METRICS = {
  FCP: 'first-contentful-paint',
  LCP: 'largest-contentful-paint',
  CLS: 'layout-shift',
  FID: 'first-input',
  TTFB: 'time-to-first-byte',
  INP: 'interaction',
}

const formatMetricValue = (name, value) => {
  if (name === VITAL_METRICS.CLS) {
    return value.toFixed(3)
  }
  return `${Math.round(value)}ms`
}

const getMetricRating = (name, value) => {
  const thresholds = {
    [VITAL_METRICS.FCP]: { good: 1800, poor: 3000 },
    [VITAL_METRICS.LCP]: { good: 2500, poor: 4000 },
    [VITAL_METRICS.CLS]: { good: 0.1, poor: 0.25 },
    [VITAL_METRICS.FID]: { good: 100, poor: 300 },
    [VITAL_METRICS.INP]: { good: 200, poor: 500 },
  }

  const metric = thresholds[name]
  if (!metric) return 'unknown'

  if (value <= metric.good) return 'good'
  if (value <= metric.poor) return 'needs-improvement'
  return 'poor'
}

const PerformanceMonitor = memo(function PerformanceMonitor() {
  useEffect(() => {
    function reportWebVitals({ id, name, label, value, attribution }) {
      const metricName = name.toLowerCase()
      const formattedValue = formatMetricValue(metricName, value)
      const rating = getMetricRating(metricName, value)

      const metric = {
        id,
        name: metricName,
        label,
        value: formattedValue,
        rating,
        timestamp: new Date().toISOString(),
      }

      if (attribution) {
        metric.attribution = {
          element: attribution.element,
          type: attribution.type,
          url: attribution.url,
        }
      }

      // Log performance metrics
      console.info('Performance metric:', {
        ...metric,
        rawValue: value,
      })

      // You can send these metrics to your analytics service here
      // Example: sendToAnalytics(metric)
    }

    function observePerformance() {
      if (!window.performance || !PerformanceObserver) {
        console.warn('Performance monitoring is not supported in this browser')
        return
      }

      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const metric = {
              id: entry.id || entry.name,
              name: entry.name,
              label: entry.entryType,
              value: entry.startTime || entry.value || 0,
              attribution: entry.attribution,
            }
            reportWebVitals(metric)
          })
        })

        // Observe Core Web Vitals and other performance metrics
        observer.observe({ 
          entryTypes: [
            'paint',
            'largest-contentful-paint',
            'layout-shift',
            'first-input',
            'navigation',
            'resource',
            'longtask',
          ] 
        })

        return () => observer.disconnect()
      } catch (error) {
        console.error('Error setting up performance monitoring:', error)
      }
    }

    const cleanup = observePerformance()
    return () => cleanup?.()
  }, [])

  return null
})

export default PerformanceMonitor 