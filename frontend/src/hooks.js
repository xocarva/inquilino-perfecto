import { useDispatch, useSelector } from "react-redux"

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
