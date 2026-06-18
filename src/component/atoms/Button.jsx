function Button({
  children, variant = 'primary', size = 'md',
  loading = false, className = '', type = 'button', ...props
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variants = {
    primary:  'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500 shadow-sm',
    secondary:'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500',
    outline:  'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    ghost:    'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    danger:   'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-2',
    xl: 'px-8 py-3.5 text-base gap-2',
  }

  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button