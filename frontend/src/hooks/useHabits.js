import { useState, useEffect, useCallback } from 'react'
import * as habitsApi from '../api/habits'

export function useHabits() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await habitsApi.listHabits()
      setHabits(list)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { habits, loading, error, reload: load }
}
