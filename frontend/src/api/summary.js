import { get } from './client'

export function getMonthlySummary(year, month) {
  return get(`/summary/${year}/${month}`)
}
