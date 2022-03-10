import { useEffect, useState } from 'react'
import { useUser } from './hooks'

function useFetch(url, defaultValue = null) {

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
        return;
      }

      setData(json)
      setIsLoading(false)
    }

    loadData();
  }, [url, user?.token])

  return { data, error, isLoading }
}

export default useFetch
