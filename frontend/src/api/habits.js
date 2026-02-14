import { get, post, put, del } from './client'

export function listHabits() {
  return get('/habits')
}

export function getHabit(id) {
  return get(`/habits/${id}`)
}

export function createHabit(body) {
  return post('/habits', body)
}

export function updateHabit(id, body) {
  return put(`/habits/${id}`, body)
}

export function deleteHabit(id) {
  return del(`/habits/${id}`)
}
