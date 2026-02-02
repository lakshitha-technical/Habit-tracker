export default function DayTypeSelect({ value, onChange }) {
  const options = [
    { value: 'WEEKDAY', label: 'Weekday' },
    { value: 'WEEKEND', label: 'Weekend' },
    { value: 'PERIODS', label: 'Recovery (periods)' },
    { value: 'SICK', label: 'Recovery (sick)' },
  ]
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 pl-4 pr-10 text-base border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-gray-300 focus:border-gray-400 appearance-none touch-manipulation"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
