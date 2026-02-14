import { useState, useEffect, useCallback } from 'react'
import * as motivationApi from '../api/motivation'

export default function useMotivation() {
  const [todayQuote, setTodayQuote] = useState(null)
  const [previousQuotes, setPreviousQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTodayQuote = useCallback(async () => {
    try {
      const quote = await motivationApi.getTodayQuote()
      setTodayQuote(quote)
    } catch (e) {
      setError(e.message || 'Failed to load today\'s quote')
    }
  }, [])

  const loadPreviousQuotes = useCallback(async (days = 7) => {
    try {
      const quotes = await motivationApi.getPreviousQuotes(days)
      setPreviousQuotes(quotes)
    } catch (e) {
      setError(e.message || 'Failed to load previous quotes')
    }
  }, [])

  const updateRemark = useCallback(async (date, remark) => {
    try {
      await motivationApi.updateDailyRemark(date, remark)
      // Reload today's quote if it's for today
      if (date === new Date().toISOString().split('T')[0]) {
        await loadTodayQuote()
      }
    } catch (e) {
      setError(e.message || 'Failed to update remark')
    }
  }, [loadTodayQuote])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      await Promise.all([loadTodayQuote(), loadPreviousQuotes()])
      setLoading(false)
    }
    
    loadData()
  }, [loadTodayQuote, loadPreviousQuotes])

  return {
    todayQuote,
    previousQuotes,
    loading,
    error,
    updateRemark,
    refreshTodayQuote: loadTodayQuote,
    refreshPreviousQuotes: loadPreviousQuotes
  }
}
