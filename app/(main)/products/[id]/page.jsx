'use client'

import { useSWRConfig } from 'swr'
import useFetch from '@hooks/use-fetch'
import { use } from 'react'
import { buildUrl } from '@lib/utils'
import currency from '@lib/currency'

import { Star, Edit, Trash2 } from 'lucide-react'

import AppWrapper from '@components/app-wrapper'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardTitle, CardHeader } from '@components/ui/card'
import Image from 'next/image'

const ProductPage = ({ params }) => {
  const { id } = use(params)

  const { accessToken } = useSWRConfig()
  const { data: response, error, isLoading } = useFetch(buildUrl(`/products/${id}`), accessToken)

  console.log(response)

  // TODO: Use Skeletion instead
  if (isLoading) {
    return <span>Loading...</span>
  }

  // TODO: Use better UI
  if (error || !response.success) {
    return <span>Something went wrong</span>
  }

  return (
    <AppWrapper
      title='Chi tiết sản phẩm'
      routeTree={[{ url: '/products', name: 'Quản lý sản phẩm' }]}
    >
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-row gap-4'>
            {/* Product Images Carousel */}
            <div className='w-full max-w-md'>
              <Carousel>
                <CarouselContent>
                  {response.data.product.images.map((image, index) => (
                    <CarouselItem key={image.id}>
                      <Image
                        src={image.imageUrl}
                        alt={`Product image ${index + 1}`}
                        className='aspect-square w-full rounded-lg object-cover'
                        width={280}
                        height={280}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='left-4' />
                <CarouselNext className='right-4' />
              </Carousel>
            </div>

            {/* Product Details */}
            <div className='space-y-4'>
              <h2 className='text-3xl font-bold'>{response.data.product.name}</h2>
              <div className='flex flex-wrap gap-2'>
                {response.data.product.categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant='secondary'
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
              <p className='text-2xl font-semibold'>{currency.format(response.data.product.price)}</p>
              <div className='flex items-center'>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(response.data.product.rate) ? 'fill-current text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className='ml-2 text-sm text-gray-600'>({response.data.product.rate})</span>
              </div>
              <p className='text-sm text-gray-600'>Có sẵn: {response.data.product.stock}</p>
              <p className='text-sm font-semibold text-green-600'>{response.data.product.status}</p>
              <div className='mt-6 flex space-x-4'>
                <Button className='flex items-center'>
                  <Edit className='h-4 w-4' /> Chỉnh sửa
                </Button>
                <Button className='flex items-center'>
                  <Edit className='h-4 w-4' /> Gỡ xuống
                </Button>
                <Button
                  variant='destructive'
                  className='flex items-center'
                >
                  <Trash2 className='h-4 w-4' /> Xóa
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>Mô tả sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{response.data.product.description}</p>
        </CardContent>
      </Card>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>Đánh giá</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{response.data.product.description}</p>
        </CardContent>
      </Card>
    </AppWrapper>
  )
}

export default ProductPage
