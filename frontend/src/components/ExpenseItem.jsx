export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const categoryColors = {
    NECESSARY: 'bg-green-100 text-green-800',
    UNNECESSARY: 'bg-red-100 text-red-800',
    INNER_JOY: 'bg-amber-100 text-amber-800'
  }

  return (
    <li className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gray-900">
            ₹{parseFloat(expense.amount).toFixed(2)}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[expense.category] || 'bg-gray-100 text-gray-800'}`}>
            {expense.category.replace('_', ' ')}
          </span>
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {expense.date}
          {expense.description && (
            <span className="ml-2 text-gray-600">• {expense.description}</span>
          )}
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        {onEdit && (
          <button 
            type="button" 
            onClick={() => onEdit(expense)} 
            className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button 
            type="button" 
            onClick={() => onDelete(expense.id)} 
            className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  )
}
