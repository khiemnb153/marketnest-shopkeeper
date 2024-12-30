'use client'

import { use } from 'react'
import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import OrderCard, { OrderCardSkeleton } from './order-card'

const ProductPage = ({ params }) => {
  const { id } = use(params)

  const { data, error, isLoading } = useFetch(`/orders/${id}`)

  const renderProduct = () => {
    if (isLoading) {
      return <OrderCardSkeleton />
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

    return <OrderCard order={data} />
  }

  return (
    <AppWrapper
      title='Chi tiết đơn hàng'
      routeTree={[{ url: '/orders', name: 'Quản lý đơn hàng' }]}
      className='flex flex-col gap-4'
    >
      {renderProduct()}
    </AppWrapper>
  )
}

export default ProductPage
