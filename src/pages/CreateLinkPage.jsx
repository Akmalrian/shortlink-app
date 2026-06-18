import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLinks } from '../hooks/useLinks'
import DashboardLayout from '../component/templates/DashboardLayout'
import AlertMessage from '../component/molecules/AlertMessages'
import Input from '../component/atoms/Input'
import Button from '../component/atoms/Button'

const shortDomain = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/^https?:\/\//, '')

const IconLink = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
)
const IconEye = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)
const IconBolt = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)
const IconBack = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)
const IconChart = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm6 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m6 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v14" />
  </svg>
)
const IconQR = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 3h6m-3-3v6" />
  </svg>
)

function CreateLinkPage() {
  const { addNewLink } = useLinks()
  const navigate = useNavigate()
  const [form, setForm] = useState({ originalUrl: '', customSlug: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.originalUrl) e.originalUrl = 'URL wajib diisi'
    else {
      try { new URL(form.originalUrl) } catch { e.originalUrl = 'Format URL tidak valid' }
    }
    if (form.customSlug) {
      if (form.customSlug.length < 3 || form.customSlug.length > 50) {
        e.customSlug = 'Slug harus 3-50 karakter'
      } else if (!/^[a-zA-Z0-9-]+$/.test(form.customSlug)) {
        e.customSlug = 'Slug hanya boleh huruf, angka, dan tanda hubung'
      }
    }
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }
    setFieldErrors({})
    setError(null)
    setLoading(true)
    try {
      await addNewLink(form.originalUrl, form.customSlug || undefined)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (fieldErrors[field]) setFieldErrors((f) => ({ ...f, [field]: '' }))
  }

  const previewSlug = form.customSlug.trim() || 'random-slug'

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:underline mb-6">
          <IconBack /> Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create New Short Link</h1>
        <p className="text-sm text-gray-500 mb-6">Transform your long URLs into clean, manageable assets.</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {error && <AlertMessage type="error" message={error} className="mb-5" />}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Destination URL *</label>
              <Input
                className="mt-1.5"
                leftElement={<IconLink />}
                type="url"
                placeholder="https://example.com/your-long-url-here"
                value={form.originalUrl}
                onChange={set('originalUrl')}
                error={fieldErrors.originalUrl}
              />
              {!fieldErrors.originalUrl && (
                <p className="text-xs text-gray-400 mt-1">Ensure your URL starts with http:// or https://</p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Custom Slug (optional)</label>
              <Input
                className="mt-1.5"
                leftElement={`${shortDomain}/`}
                placeholder="my-custom-slug"
                value={form.customSlug}
                onChange={set('customSlug')}
                error={fieldErrors.customSlug}
              />
              {!fieldErrors.customSlug && (
                <p className="text-xs text-gray-400 mt-1">Leave blank to generate a random unique identifier</p>
              )}
            </div>

            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <span className="mt-0.5 text-blue-500"><IconEye /></span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-widest text-blue-500">LIVE PREVIEW</p>
                <p className="text-sm text-blue-700 font-mono break-all">
                  Your short link will be:{' '}
                  <span className="font-semibold">https://{shortDomain}/{previewSlug}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <Button type="submit" loading={loading} className="gap-2">
                Create Link <IconBolt />
              </Button>
              <button type="button" onClick={() => navigate('/dashboard')} className="text-sm font-semibold text-gray-500 hover:text-gray-700">
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
              <IconChart />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Real-time Analytics</p>
              <p className="text-xs text-gray-500 mt-0.5">Track every click, geographical location, and referral source instantly.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <IconQR />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Auto-generated QR</p>
              <p className="text-xs text-gray-500 mt-0.5">Every link automatically creates a high-resolution QR code for print.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateLinkPage