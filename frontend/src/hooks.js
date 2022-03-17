import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"


export const useUser = () => useSelector(s => s.user)

export const useSetUser = () => {
  const dispatch = useDispatch()
  return (user) => dispatch({ type: 'login', user })
}

export const useModal = () => useSelector(s => s.modal)

export const useSetModal = () => {
  const dispatch = useDispatch()
  return (modal) => dispatch({ type: 'modal', modal })
}

export function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export function useFetch(url, defaultValue = null) {

  const user = useUser()

  const [data, setData] = useState(defaultValue)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    const opts = {}
    if (user?.token) {
      opts.headers = { 'Authorization': 'Bearer ' + user.token }
    }
    const loadData = async () => {
      setIsLoading(true)
      const response = await fetch(url, opts)

      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        return
      }

      setData(json)
      setIsLoading(false)
    }

    loadData();
  }, [url, user?.token])

  return { data, error, isLoading }
}
