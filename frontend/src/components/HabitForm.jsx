import { useState } from 'react'

const SCOPES = ['WEEKDAY', 'WEEKEND', 'BOTH']

export default function HabitForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name ?? '')
  const [scoreValue, setScoreValue] = useState(initial?.scoreValue ?? 1)
  const [isNegative, setIsNegative] = useState(initial?.isNegative ?? false)
  const [appliesTo, setAppliesTo] = useState(initial?.appliesTo ?? 'BOTH')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ 
      name, 
      scoreValue: parseInt(scoreValue), 
      isNegative, 
      appliesTo 
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        type="number"
        min="1"
        placeholder="Score value"
        value={scoreValue}
        onChange={(e) => setScoreValue(e.target.value)}
        className="w-full p-3 border rounded-lg"
        required
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isNegative"
          checked={isNegative}
          onChange={(e) => setIsNegative(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="isNegative" className="text-sm text-gray-700">
          Negative habit (deducts points)
        </label>
      </div>
      <select
        value={appliesTo}
        onChange={(e) => setAppliesTo(e.target.value)}
        className="w-full p-3 border rounded-lg"
      >
        {SCOPES.map((scope) => (
          <option key={scope} value={scope}>{scope}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 p-3 bg-gray-800 text-white rounded-lg">
          {initial ? 'Update' : 'Save'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="p-3 border rounded-lg">Cancel</button>
        )}
      </div>
    </form>
  )
}
