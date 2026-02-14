import HabitManagementItem from './HabitManagementItem'

export default function HabitManagementList({ habits, onEdit, onDelete }) {
  if (!habits?.length) return <p className="text-gray-500">No habits found.</p>
  return (
    <ul className="space-y-2">
      {habits.map((habit) => (
        <HabitManagementItem key={habit.id} habit={habit} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}
