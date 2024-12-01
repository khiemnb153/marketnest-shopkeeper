'use client'
import { useSWRConfig } from 'swr'
import useFetch from '@hooks/use-fetch'
import { buildUrl } from '@lib/utils'

const DataBlock = ({ api, searchParams, renderTemplate, loadingSkeletion, errorUI }) => {
  const { accessToken } = useSWRConfig()
  const { data, error, isLoading } = useFetch(buildUrl(api, searchParams), accessToken)

  if (isLoading) {
    return loadingSkeletion
  }

  if (error) {
    return errorUI
  }

  console.log(data)

  return renderTemplate({ data, searchParams })
}

export default DataBlock
