import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../atoms/Logo'
import Button from '../atoms/Button'

const IconChevronDown = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)
const IconPlus = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
)

function DashboardLayout({ children, showCreateButton = false }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItem = (to, label) => {
    const active = location.pathname === to
    return (
      <Link
        to={to}
        className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
          active ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-900'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo size="lg" />
            <nav className="hidden sm:flex items-center gap-6">
              {navItem('/dashboard', 'Dashboard')}
              {navItem('/analytics', 'Analytics')}
              {navItem('/links', 'Links')}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {showCreateButton && (
              <Link to="/links/new">
                <Button size="sm" className="gap-1.5"><IconPlus /> Create New Link</Button>
              </Link>
            )}

            <div className="relative">
              <button onClick={() => setMenuOpen((o) => !o)} className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                  {user?.email?.[0]?.toUpperCase() || '?'}
                </div>
                <IconChevronDown />
              </button>
              {menuOpen && (
                <div
                  onMouseLeave={() => setMenuOpen(false)}
                  className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50"
                >
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    View Profile
                  </Link>
                </div>
              )}
            </div>

            <button onClick={logout} className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}

export default DashboardLayout