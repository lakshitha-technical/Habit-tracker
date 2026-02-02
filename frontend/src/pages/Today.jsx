import { useMemo, useCallback } from 'react'
import { useDay } from '../hooks/useDay'
import { useHabits } from '../hooks/useHabits'
import * as daysApi from '../api/days'
import DayTypeSelect from '../components/DayTypeSelect'
import ScreenTimeInput from '../components/ScreenTimeInput'
import HabitList from '../components/HabitList'

const TODAY = new Date().toISOString().slice(0, 10)

function habitsForDayType(habits, dayType) {
  if (!habits.length) return []
  const isWeekend = dayType === 'WEEKEND'
  return habits.filter((h) => {
    const scope = h.appliesTo || 'BOTH'
    if (scope === 'BOTH') return true
    return isWeekend ? scope === 'WEEKEND' : scope === 'WEEKDAY'
  })
}

function buildHabitsPayload(habits, dailyHabits) {
  return habits.map((h) => {
    const d = dailyHabits?.find((x) => x.habitId === h.id)
    return {
      habitId: h.id,
      completed: d?.completed ?? false,
      valueMinutes: d?.valueMinutes ?? null,
    }
  })
}

export default function Today() {
  const { day, loading, error, reload } = useDay(TODAY)
  const { habits, loading: habitsLoading } = useHabits()

  const habitsToShow = useMemo(
    () => habitsForDayType(habits, day?.dayType ?? 'WEEKDAY'),
    [habits, day?.dayType]
  )

  const handleDayTypeChange = useCallback(
    async (dayType) => {
      try {
        await daysApi.setDayType(TODAY, dayType)
        reload()
      } catch (e) {
        console.error(e)
      }
    },
    [reload]
  )

  const handleScreenTimeChange = useCallback(
    async (minutes) => {
      try {
        await daysApi.setScreenTime(TODAY, minutes)
        reload()
      } catch (e) {
        console.error(e)
      }
    },
    [reload]
  )

  const handleHabitToggle = useCallback(
    async (habitId, completed) => {
      const payload = buildHabitsPayload(habitsToShow, day?.dailyHabits).map((p) =>
        p.habitId === habitId ? { ...p, completed } : p
      )
      try {
        await daysApi.saveHabits(TODAY, payload)
        reload()
      } catch (e) {
        console.error(e)
      }
    },
    [day?.dailyHabits, habitsToShow, reload]
  )

  const handleMinutesChange = useCallback(
    async (habitId, valueMinutes) => {
      const payload = buildHabitsPayload(habitsToShow, day?.dailyHabits).map((p) =>
        p.habitId === habitId ? { ...p, valueMinutes } : p
      )
      try {
        await daysApi.saveHabits(TODAY, payload)
        reload()
      } catch (e) {
        console.error(e)
      }
    },
    [day?.dailyHabits, habitsToShow, reload]
  )

  if (loading || habitsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500">Loading…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-red-50 text-red-700">
        <p>{error}</p>
      </div>
    )
  }

  const score = day?.dailyScore ?? 0
  const isRecovery = day?.dayType === 'PERIODS' || day?.dayType === 'SICK'

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-4">
      <header className="pt-1">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Today</p>
        <h1 className="text-2xl font-semibold text-gray-900">{TODAY}</h1>
      </header>

      <section className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Daily score</p>
            <p className={`text-3xl font-bold tabular-nums ${score >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
              {score > 0 ? `+${score}` : score}
            </p>
          </div>
          {isRecovery && (
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
              Recovery · no penalties
            </span>
          )}
        </div>
      </section>

      <section>
        <label className="block text-sm font-medium text-gray-700 mb-2">Day type</label>
        <DayTypeSelect
          value={day?.dayType ?? 'WEEKDAY'}
          onChange={handleDayTypeChange}
        />
      </section>

      <section>
        <ScreenTimeInput
          minutes={day?.screenTimeMinutes ?? 0}
          onChange={handleScreenTimeChange}
        />
      </section>

      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-3">Habits</h2>
        {habitsToShow.length === 0 ? (
          <p className="text-gray-500 py-4">No habits for this day type.</p>
        ) : (
          <HabitList
            habits={habitsToShow}
            dailyHabits={day?.dailyHabits}
            onToggle={handleHabitToggle}
            onMinutesChange={handleMinutesChange}
          />
        )}
      </section>
    </div>
  )
}
