import { useState, useEffect, useCallback } from 'react'
import * as summaryApi from '../api/summary'

export function useSummary(year, month) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!year || !month) return
    setLoading(true)
    setError(null)
    try {
      const s = await summaryApi.getMonthlySummary(year, month)
      setSummary(s)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [year, month])

  useEffect(() => { load() }, [load])

  return { summary, loading, error, reload: load }
}
