import { useState } from 'react'

export default function QuoteCard({ quote, isToday = false, onRemarkChange, existingRemark = '' }) {
  const [remark, setRemark] = useState(existingRemark)
  const [isEditing, setIsEditing] = useState(false)

  const categoryColors = {
    COURAGE: 'bg-red-100 text-red-800',
    CONSISTENCY: 'bg-blue-100 text-blue-800',
    LEARNING: 'bg-green-100 text-green-800',
    STRENGTH: 'bg-purple-100 text-purple-800',
    BELIEF: 'bg-yellow-100 text-yellow-800',
    HARDWORK: 'bg-orange-100 text-orange-800',
    PATIENCE: 'bg-pink-100 text-pink-800',
    KNOWLEDGE: 'bg-indigo-100 text-indigo-800',
    HEALTH: 'bg-teal-100 text-teal-800',
    ACTION: 'bg-gray-100 text-gray-800',
    OPPORTUNITY: 'bg-amber-100 text-amber-800',
    DISCIPLINE: 'bg-rose-100 text-rose-800',
    RESILIENCE: 'bg-cyan-100 text-cyan-800',
    EXTRA: 'bg-lime-100 text-lime-800',
    PRESENT: 'bg-emerald-100 text-emerald-800',
    CHOICE: 'bg-violet-100 text-violet-800',
    PERSEVERANCE: 'bg-fuchsia-100 text-fuchsia-800',
    PASSION: 'bg-sky-100 text-sky-800'
  }

  const handleSaveRemark = () => {
    if (onRemarkChange && quote?.date) {
      onRemarkChange(quote.date, remark)
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setRemark(existingRemark)
    setIsEditing(false)
  }

  if (!quote) return null

  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${isToday ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
      {isToday && (
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
            Today's Quote
          </span>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <svg className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h9.343c-6.537 0-11.262-2.107-13.928-5.617z"/>
          </svg>
          <blockquote className="pl-6 text-gray-700 italic text-lg leading-relaxed">
            "{quote.quote}"
          </blockquote>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <cite className="text-gray-900 font-medium">— {quote.author}</cite>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[quote.category] || 'bg-gray-100 text-gray-800'}`}>
              {quote.category}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {new Date(quote.date).toLocaleDateString()}
          </span>
        </div>

        {isToday && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Today's Reflection:
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="How did this quote inspire you today? What are your thoughts?"
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveRemark}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      Save Reflection
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {existingRemark ? (
                    <div className="p-3 bg-blue-50 rounded-lg text-gray-700 text-sm">
                      {existingRemark}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm italic">No reflection yet. Click to add your thoughts...</p>
                  )}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {existingRemark ? 'Edit Reflection' : 'Add Reflection'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
