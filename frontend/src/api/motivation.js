import { get, post } from './client'

export function getTodayQuote() {
  return get('/motivation/today')
}

export function updateDailyRemark(date, remark) {
  return post('/motivation/remark', { date, remark })
}

export function getPreviousQuotes(days = 7) {
  return get(`/motivation/previous?days=${days}`)
}

export function getAllCategories() {
  return get('/motivation/categories')
}
