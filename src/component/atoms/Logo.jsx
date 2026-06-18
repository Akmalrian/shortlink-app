import { Link } from "react-router-dom"

function Logo({ size = 'md', to = '/', className = '' }) {
  const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl', xl: 'text-3xl' }
  return (
    <Link to={to} className={`font-bold tracking-tight ${sizes[size]} ${className}`}>
      <span className="text-blue-600">Short</span>
      <span className="text-gray-900">Link</span>
    </Link>
  )
}

export default Logo