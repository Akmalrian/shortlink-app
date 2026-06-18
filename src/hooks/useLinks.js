import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLinksLoading, setLinks, addLink, removeLink, setLinksError, clearLinksError,
} from '../store/slice/linksSlice'
import { getLinks, createLink, deleteLink } from '../services/api'

export function useLinks() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((s) => s.links)
  const { token } = useSelector((s) => s.auth)

  const fetchLinks = useCallback(async () => {
    dispatch(setLinksLoading(true))
    dispatch(clearLinksError())
    try {
      const data = await getLinks(token)
      dispatch(setLinks(data.links || []))
    } catch (err) {
      dispatch(setLinksError(err.message))
    }
  }, [dispatch, token])

  const addNewLink = useCallback(async (originalUrl, customSlug) => {
    try {
      const data = await createLink(token, originalUrl, customSlug)
      dispatch(addLink(data))
      return data
    } catch (err) {
      dispatch(setLinksError(err.message))
      throw err
    }
  }, [dispatch, token])

  const removeExistingLink = useCallback(async (id) => {
    try {
      await deleteLink(token, id)
      dispatch(removeLink(id))
    } catch (err) {
      dispatch(setLinksError(err.message))
    }
  }, [dispatch, token])

  return { links: items, loading, error, fetchLinks, addNewLink, removeExistingLink }
}