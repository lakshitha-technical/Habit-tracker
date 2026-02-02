import { useState, useEffect, useCallback } from 'react'
import * as daysApi from '../api/days'

export function useDay(date) {
  const [day, setDay] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!date) return
    setLoading(true)
    setError(null)
    try {
      const d = await daysApi.getOrCreateDay(date)
      setDay(d)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [date])

  useEffect(() => { load() }, [load])

  return { day, loading, error, reload: load }
}
