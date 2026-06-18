import { useEffect, useMemo, useState } from 'react'
import { useLinks } from '../hooks/useLinks'
import DashboardLayout from '../component/templates/DashboardLayout'
import AlertMessage from '../component/molecules/AlertMessages'
import LinkRow from '../component/molecules/LinkCard'

const IconSearch = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
  </svg>
)
const IconFilter = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 9h12M10 14h4" />
  </svg>
)

const PER_PAGE = 5

function DashboardPage() {
  const { links, loading, error, fetchLinks, removeExistingLink } = useLinks()
  const [query, setQuery] = useState('')
  const [sortDesc, setSortDesc] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => { fetchLinks() }, [fetchLinks])
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setPage(1) }, [query])

  const filteredSorted = useMemo(() => {
    const filtered = links.filter((l) =>
      l.original_url.toLowerCase().includes(query.toLowerCase()) ||
      l.slug.toLowerCase().includes(query.toLowerCase())
    )
    return [...filtered].sort((a, b) => {
      const diff = new Date(b.created_at) - new Date(a.created_at)
      return sortDesc ? diff : -diff
    })
  }, [links, query, sortDesc])

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filteredSorted.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  return (
    <DashboardLayout showCreateButton>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Links</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your shortened digital assets.</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-bold tracking-widest text-gray-400">TOTAL ACTIVE</p>
          <p className="text-2xl font-bold text-blue-600">{links.length}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <IconSearch />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or URL..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => setSortDesc((s) => !s)}
          title={sortDesc ? 'Newest first' : 'Oldest first'}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors shrink-0"
        >
          <IconFilter />
        </button>
      </div>

      {error && <AlertMessage type="error" message={error} className="mb-5" />}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {loading ? (
          <p className="text-sm text-gray-400 px-6 py-10 text-center">Loading...</p>
        ) : paginated.length === 0 ? (
          <p className="text-sm text-gray-400 px-6 py-16 text-center">
            {links.length === 0 ? "You haven't created any links yet." : 'No links match your search.'}
          </p>
        ) : (
          <div className="divide-y divide-gray-100 px-6">
            {paginated.map((link) => (
              <LinkRow key={link.id} link={link} onDelete={removeExistingLink} />
            ))}
          </div>
        )}

        {!loading && filteredSorted.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 disabled:opacity-40 transition-colors"
            >
              ← Prev Page
            </button>
            <span className="text-sm text-gray-500">{currentPage} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 disabled:opacity-40 transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage