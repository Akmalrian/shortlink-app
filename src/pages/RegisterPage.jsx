import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AlertMessage from '../component/molecules/AlertMessages'
import Input from '../component/atoms/Input'
import Button from '../component/atoms/Button'

function RegisterPage() {
  const { register, loading, error } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [fieldErrors, setFieldErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email wajib diisi'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Format email tidak valid'
    if (!form.password) e.password = 'Password wajib diisi'
    else if (form.password.length < 8) e.password = 'Minimum 8 karakter'
    if (!form.confirm) e.confirm = 'Konfirmasi password wajib diisi'
    else if (form.confirm !== form.password) e.confirm = 'Password tidak cocok'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }
    setFieldErrors({})
    await register(form.email, form.password)
  }

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (fieldErrors[field]) setFieldErrors((f) => ({ ...f, [field]: '' }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-90">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-9">

            <div className="flex justify-center mb-6">
              <img src="/logo-shortlink.svg" alt="" />
            </div>

            <h1 className="text-[22px] font-bold text-gray-900 mb-1 text-center">Create Account</h1>
            <p className="text-sm text-gray-500 mb-6 text-center">Join the site architects of the web.</p>

            {error && <AlertMessage type="error" message={error} className="mb-4" />}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Input
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={set('email')}
                error={fieldErrors.email}
                autoComplete="email"
              />

              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={set('password')}
                  error={fieldErrors.password}
                  autoComplete="new-password"
                />
                {!fieldErrors.password && (
                  <p className="mt-1 text-[10px] font-semibold tracking-widest text-gray-400">
                    MINIMUM 8 CHARACTERS
                  </p>
                )}
              </div>

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={set('confirm')}
                error={fieldErrors.confirm}
                autoComplete="new-password"
              />

              <Button type="submit" loading={loading} className="w-full" size="lg">
                Sign Up →
              </Button>
            </form>

            <p className="text-center text-[11px] text-gray-400 mt-4 leading-relaxed">
              By signing up, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="py-4 px-6 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400">
        <span>© 2024 SHORTLINK. THE DIGITAL ARCHITECT.</span>
        <div className="flex gap-4">
          {['API DOCUMENTATION', 'SUPPORT'].map((t) => (
            <a key={t} href="#" className="hover:text-gray-600 transition-colors">{t}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default RegisterPage