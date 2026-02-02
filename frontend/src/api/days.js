import { get, put } from './client'

export function getDay(date) {
  return get(`/days/${date}`)
}

export function getOrCreateDay(date) {
  return put(`/days/${date}`)
}

export function setDayType(date, dayType) {
  return put(`/days/${date}/day-type`, { dayType })
}

export function setScreenTime(date, minutes) {
  return put(`/days/${date}/screen-time`, { minutes })
}

export function saveHabits(date, habits) {
  return put(`/days/${date}/habits`, habits)
}

export function getScore(date) {
  return get(`/days/${date}/score`)
}
