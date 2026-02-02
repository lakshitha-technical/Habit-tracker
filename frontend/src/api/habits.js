import { get } from './client'

export function listHabits() {
  return get('/habits')
}
