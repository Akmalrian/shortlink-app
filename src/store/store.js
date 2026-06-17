import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import linksReducer from './slice/linksSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer,
  },
})

export default store
