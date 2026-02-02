export default function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <span className="font-medium">{expense.amount}</span>
        <span className="text-gray-500 ml-2">{expense.category}</span>
        {expense.description && <span className="block text-sm text-gray-500">{expense.description}</span>}
      </div>
      <div className="flex gap-2">
        {onEdit && <button type="button" onClick={() => onEdit(expense)} className="text-sm text-blue-600">Edit</button>}
        {onDelete && <button type="button" onClick={() => onDelete(expense.id)} className="text-sm text-red-600">Delete</button>}
      </div>
    </li>
  )
}
