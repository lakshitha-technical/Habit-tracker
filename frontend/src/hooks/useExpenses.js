import { useState, useEffect, useCallback } from 'react'
import * as expensesApi from '../api/expenses'

export function useExpenses(from, to) {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!from || !to) return
    setLoading(true)
    setError(null)
    try {
      const list = await expensesApi.listExpenses(from, to)
      setExpenses(list)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [from, to])

  useEffect(() => { load() }, [load])

  return { expenses, loading, error, reload: load }
}
