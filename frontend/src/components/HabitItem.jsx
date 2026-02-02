export default function HabitItem({ habit, daily, onToggle, onMinutesChange }) {
  const isNegative = habit.isNegative
  const completed = daily?.completed ?? false
  const valueMinutes = daily?.valueMinutes ?? 0

  return (
    <li className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 active:bg-gray-100 min-h-[56px]">
      {isNegative ? (
        <input
          type="number"
          min="0"
          value={valueMinutes || ''}
          onChange={(e) => onMinutesChange?.(habit.id, parseInt(e.target.value, 10) || 0)}
          placeholder="0"
          className="w-14 h-11 text-center border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-offset-0 focus:ring-gray-300 focus:border-gray-400"
          inputMode="numeric"
        />
      ) : (
        <button
          type="button"
          role="checkbox"
          aria-checked={completed}
          onClick={() => onToggle?.(habit.id, !completed)}
          className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors touch-manipulation ${
            completed
              ? 'bg-gray-800 border-gray-800 text-white'
              : 'bg-white border-gray-300 text-transparent hover:border-gray-400'
          }`}
        >
          {completed && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      )}
      <span className="flex-1 text-gray-900 font-medium min-w-0">{habit.name}</span>
      <span className={`flex-shrink-0 text-sm tabular-nums ${habit.isNegative ? 'text-red-600' : 'text-gray-500'}`}>
        {habit.isNegative ? '−' : '+'}{habit.scoreValue ?? 1}
      </span>
    </li>
  )
}
