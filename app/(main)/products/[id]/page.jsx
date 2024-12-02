'use client'

import { useSWRConfig } from 'swr'
import useFetch from '@hooks/use-fetch'
import { use } from 'react'
import { buildUrl } from '@lib/utils'

import AppWrapper from '@components/app-wrapper'
import DataBlock from '@components/data-block'
import ProductCard from './product-card'

const ProductPage = ({ params }) => {
  const { id } = use(params)

  return (
    <AppWrapper
      title='Chi tiết sản phẩm'
      routeTree={[{ url: '/products', name: 'Quản lý sản phẩm' }]}
      className='flex flex-col gap-4'
    >
      <DataBlock
        api={`/products/${id}`}
        renderTemplate={ProductCard}
        loadingSkeletion={<span>Đang tải...</span>}
        errorUI={<span>Đã có lỗi xảy ra</span>}
      />
    </AppWrapper>
  )
}

export default ProductPage
