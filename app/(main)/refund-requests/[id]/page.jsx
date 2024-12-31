'use client'

import { use } from 'react'
import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import RefundRequestCard, { RefundRequestCardSkeleton } from './refund-request-card'

const RefundRequestPage = ({ params }) => {
  const { id } = use(params)

  const { data, error, isLoading } = useFetch(`/refund-requests/${id}`)

  console.log(data)

  const renderRefundRequest = () => {
    if (isLoading) {
      return <RefundRequestCardSkeleton />
    }

    if (error) {
      return (
        <span>
          Something went wrong!!!
          <br />
          Code: {error.status}
        </span>
      )
    }

    return <RefundRequestCard refundRequest={data.refundRequest} />
  }

  return (
    <AppWrapper
      title='Chi tiết yêu cầu hoàn trả'
      routeTree={[{ url: '/refund-requests', name: 'Quản lý yêu cầu hoàn trả' }]}
      className='flex flex-col items-center gap-4'
    >
      {renderRefundRequest()}
    </AppWrapper>
  )
}

export default RefundRequestPage
