import useFetchSuspense from 'fetch-suspense'
import { useUser } from './hooks'

function useFetch(url) {
  // Ampliamos el useFetch con suspense para que envíe el token
  const user = useUser()
  const opts = {}
  if (user?.token) {
    opts.headers = { 'Authorization': 'Bearer ' + user.token }
  }
  const data = useFetchSuspense(url, opts)
  return data
}

export default useFetch
