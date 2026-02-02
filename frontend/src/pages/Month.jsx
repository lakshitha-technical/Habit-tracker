export default function Month() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Month · {year}-{String(month).padStart(2, '0')}</h1>
      <p className="text-gray-500">Monthly summary: habit score and expenses by category.</p>
    </div>
  )
}
