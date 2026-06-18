import { useState } from 'react'

const IconLink = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
)
const IconCalendar = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)
const IconCopy = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)
const IconTrash = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M4 7h16M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
  </svg>
)

function formatDate(dateString) {
  return new Date(dateString)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase()
}

function LinkRow({ link, onDelete }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link.short_url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const shortDisplay = link.short_url.replace(/^https?:\/\//, '')

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <IconLink />
        </div>
        <div className="min-w-0">
          <a href={link.short_url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">
            {shortDisplay}
          </a>
          <p className="text-xs text-gray-400 truncate max-w-xs sm:max-w-md">{link.original_url}</p>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-400">
            <IconCalendar />
            {formatDate(link.created_at)}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={handleCopy} title="Copy" className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
          {copied ? '✓' : <IconCopy />}
        </button>
        <button onClick={() => onDelete(link.id)} title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors">
          <IconTrash />
        </button>
      </div>
    </div>
  )
}

export default LinkRow