import React from 'react'
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
