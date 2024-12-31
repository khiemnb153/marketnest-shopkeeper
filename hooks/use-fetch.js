import useSWR from 'swr'
import fetcher from '@lib/fetcher'
import { useSWRConfig } from 'swr'

const useFetch = (endpoint, options = {}) => {
  const { accessToken } = useSWRConfig()

  const { data, error, isLoading } = useSWR(endpoint, (endpoint) => fetcher(endpoint, accessToken), {
    revalidateIfStale: true,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    ...options,
  })

  return {
    data,
    error,
    isLoading,
  }
}

export default useFetch
