import { useState, useEffect } from 'react'
import * as summaryApi from '../api/summary'

export function useMonthlySummary(year, month) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadSummary() {
      try {
        setLoading(true)
        setError(null)
        const data = await summaryApi.getMonthlySummary(year, month)
        setSummary(data)
      } catch (e) {
        setError(e.message || 'Failed to load monthly summary')
      } finally {
        setLoading(false)
      }
    }

    if (year && month) {
      loadSummary()
    }
  }, [year, month])

  return { summary, loading, error }
}
