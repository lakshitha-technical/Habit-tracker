import useMotivation from '../hooks/useMotivation'
import QuoteCard from '../components/QuoteCard'

export default function Motivation() {
  const {
    todayQuote,
    previousQuotes,
    loading,
    error,
    updateRemark,
    refreshTodayQuote,
    refreshPreviousQuotes
  } = useMotivation()

  const handleRemarkChange = async (date, remark) => {
    await updateRemark(date, remark)
  }

  const handleRefresh = async () => {
    await Promise.all([refreshTodayQuote(), refreshPreviousQuotes()])
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500">Loading daily motivation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-red-600 font-medium">Failed to load motivation</p>
            <p className="text-gray-500 text-sm">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Daily Motivation</h1>
        <p className="text-gray-600">Start your day with inspiration and reflect on your journey</p>
      </header>

      {/* Today's Quote */}
      {todayQuote && (
        <section>
          <QuoteCard
            quote={todayQuote}
            isToday={true}
            onRemarkChange={handleRemarkChange}
            existingRemark={todayQuote.dailyRemark}
          />
        </section>
      )}

      {/* Previous Days */}
      {previousQuotes.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Previous Days</h2>
            <button
              onClick={handleRefresh}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Refresh
            </button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {previousQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                isToday={false}
                existingRemark={quote.dailyRemark}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!todayQuote && previousQuotes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Quotes Available</h3>
          <p className="text-gray-500 mb-4">Start by adding some motivational quotes to inspire your daily journey.</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Load Quotes
          </button>
        </div>
      )}
    </div>
  )
}
