import useSWR from 'swr'
import fetcher from '@lib/fetcher'

const useFetch = (endpoint, accessToken) => {
  const { data, error, isLoading } = useSWR(endpoint, (endpoint) => fetcher(endpoint, accessToken))

  return {
    data,
    error,
    isLoading,
  }
}

export default useFetch
