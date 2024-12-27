'use client'

import { use } from 'react'
import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import VoucherCard, { VoucherCardSkeleton } from './voucher-card'

const VoucherPage = ({ params }) => {
  const { id } = use(params)

  const { data, error, isLoading } = useFetch(`/discounts/${id}`)

  const renderVoucher = () => {
    if (isLoading) {
      return <VoucherCardSkeleton />
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

    return <VoucherCard voucher={data.discount} />
  }

  return (
    <AppWrapper
      title='Chi tiết khuyến mãi'
      routeTree={[{ url: '/vouchers', name: 'Quản lý khuyến mãi' }]}
      className='flex flex-col gap-4'
    >
      {renderVoucher()}
    </AppWrapper>
  )
}

export default VoucherPage
