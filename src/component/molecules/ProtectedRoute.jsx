import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { token } = useSelector((s) => s.auth)
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute