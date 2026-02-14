export default function HabitManagementItem({ habit, onEdit, onDelete }) {
  const scopeColors = {
    WEEKDAY: 'bg-blue-100 text-blue-800',
    WEEKEND: 'bg-green-100 text-green-800',
    BOTH: 'bg-purple-100 text-purple-800'
  }

  return (
    <li className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gray-900">
            {habit.name}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${scopeColors[habit.appliesTo] || 'bg-gray-100 text-gray-800'}`}>
            {habit.appliesTo}
          </span>
          {habit.isNegative && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
              Negative
            </span>
          )}
        </div>
        <div className="mt-1 text-sm text-gray-500">
          Score: {habit.scoreValue} points
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        {onEdit && (
          <button 
            type="button" 
            onClick={() => onEdit(habit)} 
            className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button 
            type="button" 
            onClick={() => onDelete(habit.id)} 
            className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  )
}
