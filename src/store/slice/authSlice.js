import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.loading = false
      state.error = null
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    },
    logout: (state) => {
      state.token = null
      state.user = null
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { setCredentials, setLoading, setError, clearError, logout } = authSlice.actions
export default authSlice.reducer