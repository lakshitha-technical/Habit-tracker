import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const path = useLocation().pathname
  return (
    <div className="min-h-screen safe-area-pb flex flex-col">
      <main className="flex-1 p-4 pb-20">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white flex justify-around py-2 safe-area-pb">
        <NavLink to="/" active={path === '/'}>Today</NavLink>
        <NavLink to="/expenses" active={path === '/expenses'}>Expenses</NavLink>
        <NavLink to="/month" active={path === '/month'}>Month</NavLink>
        <NavLink to="/habits" active={path === '/habits'}>Habits</NavLink>
        <NavLink to="/motivation" active={path === '/motivation'}>Motivation</NavLink>
      </nav>
    </div>
  )
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded ${active ? 'bg-gray-200 font-medium' : 'text-gray-600'}`}
    >
      {children}
    </Link>
  )
}
