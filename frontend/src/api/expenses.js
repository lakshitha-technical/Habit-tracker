import { get, post, put, del } from './client'

export function listExpenses(from, to) {
  return get(`/expenses?from=${from}&to=${to}`)
}

export function getExpense(id) {
  return get(`/expenses/${id}`)
}

export function createExpense(body) {
  return post('/expenses', body)
}

export function updateExpense(id, body) {
  return put(`/expenses/${id}`, body)
}

export function deleteExpense(id) {
  return del(`/expenses/${id}`)
}
