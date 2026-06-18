import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Logo from '../component/atoms/Logo'
import AlertMessage from '../component/molecules/AlertMessages'
import Input from '../component/atoms/Input'
import Button from '../component/atoms/Button'


const EyeOpen = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)
const EyeOff = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
)
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

function LoginPage() {
  const { login, loading, error } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email wajib diisi'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Format email tidak valid'
    if (!form.password) e.password = 'Password wajib diisi'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }
    setFieldErrors({})
    await login(form.email, form.password)
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

            <div className="flex justify-center mb-7">
              <Logo size="xl" />
            </div>

            <h1 className="text-[22px] font-bold text-gray-900 mb-1">Welcome Back</h1>
            <p className="text-sm text-gray-500 mb-6">Please enter your details to sign in.</p>

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

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <button type="button" className="text-xs text-blue-600 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <Input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={set('password')}
                  error={fieldErrors.password}
                  autoComplete="current-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPass((p) => !p)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPass ? <EyeOff /> : <EyeOpen />}
                    </button>
                  }
                />
              </div>

              <Button type="submit" loading={loading} className="w-full mt-1" size="lg">
                Log In →
              </Button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium tracking-wide">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              Sign in with Google
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="py-4 px-6 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400">
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

export default LoginPage