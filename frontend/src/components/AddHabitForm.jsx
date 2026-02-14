import { useState } from 'react'

const APPLIES_OPTIONS = [
  { value: 'BOTH', label: 'Every day' },
  { value: 'WEEKDAY', label: 'Weekdays only' },
  { value: 'WEEKEND', label: 'Weekends only' },
]

export default function AddHabitForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [scoreValue, setScoreValue] = useState(1)
  const [isNegative, setIsNegative] = useState(false)
  const [appliesTo, setAppliesTo] = useState('BOTH')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({
      name: name.trim(),
      scoreValue,
      isNegative,
      appliesTo,
    })
    setName('')
    setScoreValue(1)
    setIsNegative(false)
    setAppliesTo('BOTH')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <h3 className="text-sm font-medium text-gray-700">Add habit</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Habit name"
        className="w-full h-11 px-4 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
        required
      />
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="score"
            checked={scoreValue === 1}
            onChange={() => setScoreValue(1)}
            className="w-4 h-4"
          />
          <span className="text-sm">+1</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="score"
            checked={scoreValue === 2}
            onChange={() => setScoreValue(2)}
            className="w-4 h-4"
          />
          <span className="text-sm">+2</span>
        </label>
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isNegative}
          onChange={(e) => setIsNegative(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300"
        />
        <span className="text-sm">Negative (e.g. screen time, minutes)</span>
      </label>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Applies to</label>
        <select
          value={appliesTo}
          onChange={(e) => setAppliesTo(e.target.value)}
          className="w-full h-11 px-4 border border-gray-200 rounded-lg bg-white text-sm"
        >
          {APPLIES_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 h-11 bg-gray-800 text-white rounded-lg font-medium"
        >
          Add
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="h-11 px-4 border rounded-lg text-gray-700">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
