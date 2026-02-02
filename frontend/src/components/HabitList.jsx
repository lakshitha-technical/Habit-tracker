import HabitItem from './HabitItem'

export default function HabitList({ habits, dailyHabits, onToggle, onMinutesChange }) {
  return (
    <ul className="space-y-3">
      {habits.map((h) => (
        <HabitItem
          key={h.id}
          habit={h}
          daily={dailyHabits?.find((d) => d.habitId === h.id)}
          onToggle={onToggle}
          onMinutesChange={onMinutesChange}
        />
      ))}
    </ul>
  )
}
