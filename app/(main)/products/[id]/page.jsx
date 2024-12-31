'use client'

import { use } from 'react'
import useFetch from '@hooks/use-fetch'

import AppWrapper from '@components/app-wrapper'
import ProductCard, { ProductCardSkeleton } from './product-card'

const ProductPage = ({ params }) => {
  const { id } = use(params)

  const { data, error, isLoading } = useFetch(`/products/${id}`)

  const renderProduct = () => {
    if (isLoading) {
      return <ProductCardSkeleton />
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

    return (
      <ProductCard
        product={{
          ...data.product,
          status: data.product.status == 'Active' && data.product.stock == 0 ? 'Out_Of_Stock' : data.product.status,
        }}
      />
    )
  }

  return (
    <AppWrapper
      title='Chi tiết sản phẩm'
      routeTree={[{ url: '/products', name: 'Quản lý sản phẩm' }]}
      className='flex flex-col gap-4'
    >
      {renderProduct()}
    </AppWrapper>
  )
}

export default ProductPage
