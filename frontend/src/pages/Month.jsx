import { useState } from 'react'
import { useMonthlySummary } from '../hooks/useMonthlySummary'
import DailyScoreChart from '../components/DailyScoreChart'
import ExpensePieChart from '../components/ExpensePieChart'

export default function Month() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  
  const { summary, loading, error } = useMonthlySummary(selectedYear, selectedMonth)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500">Loading monthly summary…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-red-50 text-red-700">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {monthNames[selectedMonth - 1]} · {selectedYear}
        </h1>
        <div className="flex gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
          >
            {monthNames.map((name, index) => (
              <option key={index + 1} value={index + 1}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Daily Score Trend</h2>
          <DailyScoreChart data={summary?.dailyScores || []} />
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Expenses by Category</h2>
          <ExpensePieChart data={summary?.totalByCategory || {}} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Habit Score</p>
            <p className="text-2xl font-bold text-blue-600">
              {summary?.totalHabitScore || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">
              ₹{summary?.totalExpenses ? parseFloat(summary.totalExpenses).toFixed(2) : '0.00'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Days Tracked</p>
            <p className="text-2xl font-bold text-green-600">
              {summary?.dailyScores?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
