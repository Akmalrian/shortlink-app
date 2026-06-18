import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setLinksLoading: (state, action) => {
      state.loading = action.payload
    },
    setLinks: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addLink: (state, action) => {
      state.items.unshift(action.payload)
    },
    removeLink: (state, action) => {
      state.items = state.items.filter((l) => l.id !== action.payload)
    },
    setLinksError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    clearLinksError: (state) => {
      state.error = null
    },
  },
})

export const {
  setLinksLoading, setLinks, addLink, removeLink, setLinksError, clearLinksError,
} = linksSlice.actions
export default linksSlice.reducer