'use client'

import { use } from 'react'
import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import ShopCard, { ShopCardSkeleton } from './shop-card'

const ShopPage = () => {
  const { data, error, isLoading } = useFetch(`/shopkeepers/me`)

  const renderShop = () => {
    if (isLoading) {
      return <ShopCardSkeleton />
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

    return <ShopCard shop={data} />
  }

  return (
    <AppWrapper
      title='Hồ sơ cửa hàng'
      className='flex flex-col gap-4'
    >
      {renderShop()}
    </AppWrapper>
  )
}

export default ShopPage
