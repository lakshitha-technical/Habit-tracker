import { useState, useEffect, useCallback } from 'react'
import * as expensesApi from '../api/expenses'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'

export default function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)

  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const from = firstDayOfMonth.toISOString().slice(0, 10)
  const to = today.toISOString().slice(0, 10)

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await expensesApi.listExpenses(from, to)
      setExpenses(data)
    } catch (e) {
      setError(e.message || 'Failed to load expenses')
    } finally {
      setLoading(false)
    }
  }, [from, to])

  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  const handleCreate = useCallback(async (expenseData) => {
    try {
      await expensesApi.createExpense(expenseData)
      setShowForm(false)
      loadExpenses()
    } catch (e) {
      setError(e.message || 'Failed to create expense')
    }
  }, [loadExpenses])

  const handleUpdate = useCallback(async (id, expenseData) => {
    try {
      await expensesApi.updateExpense(id, expenseData)
      setEditingExpense(null)
      loadExpenses()
    } catch (e) {
      setError(e.message || 'Failed to update expense')
    }
  }, [loadExpenses])

  const handleDelete = useCallback(async (id) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        await expensesApi.deleteExpense(id)
        loadExpenses()
      } catch (e) {
        setError(e.message || 'Failed to delete expense')
      }
    }
  }, [loadExpenses])

  const handleEdit = useCallback((expense) => {
    setEditingExpense(expense)
    setShowForm(true)
  }, [])

  const handleCancel = useCallback(() => {
    setShowForm(false)
    setEditingExpense(null)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500">Loading expenses…</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Expenses</h1>
          <p className="text-sm text-gray-500">Manual expense entry and management</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          + Add Expense
        </button>
      </header>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingExpense ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <ExpenseForm
            initial={editingExpense}
            onSubmit={(data) => editingExpense ? handleUpdate(editingExpense.id, data) : handleCreate(data)}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Expenses ({from} to {to})
        </h2>
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {expenses.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Number of Expenses</p>
              <p className="text-2xl font-bold text-blue-600">{expenses.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Average Expense</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{(expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0) / expenses.length).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
