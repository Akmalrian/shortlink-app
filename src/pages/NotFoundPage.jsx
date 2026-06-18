import { Link } from 'react-router-dom'
import Button from '../component/atoms/Button'

const IconWarning = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.516 11.59c.75 1.334-.213 2.987-1.742 2.987H3.483c-1.53 0-2.493-1.653-1.743-2.987L8.257 3.1zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
)
const IconBack = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const SWAGGER_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/swagger/index.html`

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-x-1/3 -translate-y-1/3" />

        <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-6">
          <img src="/Background.svg" alt="" />
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <IconWarning />
          </div>
        </div>

        <p className="text-5xl font-extrabold text-blue-600 mb-2">404</p>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It may have been moved, deleted, or the link might be broken.
        </p>

        <div className="flex items-center gap-3 mb-12">
          <Link to="/dashboard">
            <Button size="md" className="gap-2"><IconBack /> Go to Dashboard</Button>
          </Link>
          <a href="mailto:support@shortlink.io?subject=Issue%20Report">
            <Button variant="secondary" size="md">Report an Issue</Button>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full relative z-10">
          <Link to="/analytics" className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-3"><img src="/CheckAnalytics.svg" alt="icon" /></div>
            <p className="text-sm font-bold text-gray-900 mb-1">Check Analytics</p>
            <p className="text-xs text-gray-500">Track your active links and traffic sources in real-time.</p>
          </Link>
          <Link to="/links/new" className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3"><img src="/NewShortlink.svg" alt="icon" /></div>
            <p className="text-sm font-bold text-gray-900 mb-1">New ShortLink</p>
            <p className="text-xs text-gray-500">Create a brand new shortened URL in seconds.</p>
          </Link>
          <a href={SWAGGER_URL} target="_blank" rel="noreferrer" className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-3"><img src="/DeveloperApi.svg" alt="icon" /></div>
            <p className="text-sm font-bold text-gray-900 mb-1">Developer API</p>
            <p className="text-xs text-gray-500">Integrate our link infrastructure into your apps.</p>
          </a>
        </div>
      </div>

      <footer className="py-4 px-6 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400 border-t border-gray-100 bg-white">
        <span>© 2024 SHORTLINK. THE DIGITAL ARCHITECT.</span>
        <div className="flex gap-4">
          {['PRIVACY POLICY', 'TERMS OF SERVICE', 'API DOCUMENTATION', 'SUPPORT'].map((t) => (
            <a key={t} href="#" className="hover:text-gray-600 transition-colors">{t}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default NotFoundPage