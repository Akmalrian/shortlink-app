function Input({ label, error, hint, className = '', inputClassName = '', leftElement, rightElement, ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 leading-none">{label}</label>
      )}
      <div className="relative flex items-stretch">
        {leftElement && (
          <span className="flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-500 font-mono whitespace-nowrap shrink-0">
            {leftElement}
          </span>
        )}
        <input
          className={`
            w-full text-sm text-gray-900 placeholder:text-gray-400 bg-white outline-none transition-all
            border px-3 py-2.5
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${leftElement ? 'rounded-r-lg' : 'rounded-lg'}
            ${error
              ? 'border-red-400 bg-red-50 focus:ring-red-400 focus:border-red-400'
              : 'border-gray-300 hover:border-gray-400'}
            ${rightElement ? 'pr-10' : ''}
            ${inputClassName}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>
      {!error && hint && <p className="text-xs text-gray-400 leading-tight">{hint}</p>}
      {error && <p className="text-xs text-red-500 leading-tight">{error}</p>}
    </div>
  )
}

export default Input