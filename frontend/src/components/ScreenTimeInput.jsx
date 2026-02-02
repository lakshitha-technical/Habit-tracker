export default function ScreenTimeInput({ minutes, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Screen time (min)</label>
      <input
        type="number"
        min="0"
        value={minutes ?? ''}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        className="w-full h-12 px-4 text-base border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
        inputMode="numeric"
        placeholder="0"
      />
    </div>
  )
}
