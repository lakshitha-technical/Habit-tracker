import { useState } from 'react'

const CATEGORIES = ['NECESSARY', 'UNNECESSARY', 'INNER_JOY']

export default function ExpenseForm({ initial, onSubmit, onCancel }) {
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10))
  const [amount, setAmount] = useState(initial?.amount ?? '')
  const [category, setCategory] = useState(initial?.category ?? 'NECESSARY')
  const [description, setDescription] = useState(initial?.description ?? '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ date, amount: parseFloat(amount), category, description: description || null })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 border rounded-lg"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border rounded-lg"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c.replace('_', ' ')}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />
      <div className="flex gap-2">
        <button type="submit" className="flex-1 p-3 bg-gray-800 text-white rounded-lg">Save</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="p-3 border rounded-lg">Cancel</button>
        )}
      </div>
    </form>
  )
}
