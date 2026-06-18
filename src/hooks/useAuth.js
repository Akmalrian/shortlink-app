import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setCredentials, setLoading, setError, clearError, logout as logoutAction,
} from '../store/slice/authSlice'
import { loginUser, registerUser, logoutUser } from '../services/api'

export function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token, loading, error } = useSelector((s) => s.auth)

  const login = async (email, password) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    try {
      const data = await loginUser(email, password)
      dispatch(setCredentials({ token: data.token, user: data.user }))
      navigate('/dashboard')
    } catch (err) {
      dispatch(setError(err.message))
    }
  }

  const register = async (email, password) => {
    dispatch(setLoading(true))
    dispatch(clearError())
    try {
      await registerUser(email, password)
      const data = await loginUser(email, password)
      dispatch(setCredentials({ token: data.token, user: data.user }))
      navigate('/dashboard')
    } catch (err) {
      dispatch(setError(err.message))
    }
  }

  const logout = async () => {
    try {
      if (token) await logoutUser(token)
    } catch {
      // tetap clear sesi lokal walau request logout ke server gagal
    } finally {
      dispatch(logoutAction())
      navigate('/login')
    }
  }

  return { user, token, loading, error, login, register, logout }
}