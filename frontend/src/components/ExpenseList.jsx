import ExpenseItem from './ExpenseItem'

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses?.length) return <p className="text-gray-500">No expenses in this range.</p>
  return (
    <ul className="space-y-2">
      {expenses.map((e) => (
        <ExpenseItem key={e.id} expense={e} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}
