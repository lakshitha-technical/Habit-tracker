import { useState, useEffect, useCallback } from 'react'
import * as habitsApi from '../api/habits'
import HabitForm from '../components/HabitForm'
import HabitManagementList from '../components/HabitManagementList'

export default function HabitManagement() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingHabit, setEditingHabit] = useState(null)

  const loadHabits = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await habitsApi.listHabits()
      setHabits(data)
    } catch (e) {
      setError(e.message || 'Failed to load habits')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadHabits()
  }, [loadHabits])

  const handleCreate = useCallback(async (habitData) => {
    try {
      await habitsApi.createHabit(habitData)
      setShowForm(false)
      loadHabits()
    } catch (e) {
      setError(e.message || 'Failed to create habit')
    }
  }, [loadHabits])

  const handleUpdate = useCallback(async (id, habitData) => {
    try {
      await habitsApi.updateHabit(id, habitData)
      setEditingHabit(null)
      setShowForm(false)
      loadHabits()
    } catch (e) {
      setError(e.message || 'Failed to update habit')
    }
  }, [loadHabits])

  const handleDelete = useCallback(async (id) => {
    if (confirm('Are you sure you want to delete this habit? This will also delete all daily entries for this habit.')) {
      try {
        await habitsApi.deleteHabit(id)
        loadHabits()
      } catch (e) {
        setError(e.message || 'Failed to delete habit')
      }
    }
  }, [loadHabits])

  const handleEdit = useCallback((habit) => {
    setEditingHabit(habit)
    setShowForm(true)
  }, [])

  const handleCancel = useCallback(() => {
    setShowForm(false)
    setEditingHabit(null)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500">Loading habits…</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Manage Habits</h1>
          <p className="text-sm text-gray-500">Create, edit, and delete habits</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          + Add Habit
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
            {editingHabit ? 'Edit Habit' : 'Add New Habit'}
          </h2>
          <HabitForm
            initial={editingHabit}
            onSubmit={(data) => editingHabit ? handleUpdate(editingHabit.id, data) : handleCreate(data)}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Your Habits</h2>
        <HabitManagementList
          habits={habits}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {habits.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Habits</p>
              <p className="text-2xl font-bold text-blue-600">{habits.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Positive Habits</p>
              <p className="text-2xl font-bold text-green-600">
                {habits.filter(h => !h.isNegative).length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Negative Habits</p>
              <p className="text-2xl font-bold text-red-600">
                {habits.filter(h => h.isNegative).length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
