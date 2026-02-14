import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = {
  NECESSARY: '#10b981',
  UNNECESSARY: '#ef4444', 
  INNER_JOY: '#f59e0b'
}

export default function ExpensePieChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No expense data available</p>
      </div>
    )
  }

  const chartData = Object.entries(data).map(([category, amount]) => ({
    name: category.charAt(0) + category.slice(1).toLowerCase(),
    value: parseFloat(amount),
    color: COLORS[category] || '#6b7280'
  }))

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">Total Expenses</p>
        <p className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</p>
      </div>
    </div>
  )
}
