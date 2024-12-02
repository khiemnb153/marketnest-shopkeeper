'use client'

import currency from '@lib/currency'

import { Star, Pencil, Trash2, ArrowDown } from 'lucide-react'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardTitle, CardHeader } from '@components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

import ConfirmationButton from '@components/confirmation-button'

const ProductCard = ({ data }) => {
  return (
    <>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-row gap-4'>
            {/* Product Images Carousel */}
            <div className='w-full max-w-md'>
              <Carousel>
                <CarouselContent>
                  {data.data.product.images.map((image, index) => (
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
              <h2 className='text-3xl font-bold'>{data.data.product.name}</h2>
              <div className='flex flex-wrap gap-2'>
                {data.data.product.categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant='secondary'
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
              <p className='text-2xl font-semibold'>{currency.format(data.data.product.price)}</p>
              <div className='flex items-center'>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(data.data.product.rate) ? 'fill-current text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className='ml-2 text-sm text-muted-foreground'>({data.data.product.rate})</span>
              </div>
              <p className='text-sm text-muted-foreground'>Có sẵn: {data.data.product.stock}</p>
              <p className='text-sm font-semibold text-green-600'>{data.data.product.status}</p>
              <div className='mt-6 flex space-x-4'>
                <Button asChild>
                  <Link
                    href={`/products/${data.data.product.id}/edit`}
                    className='cursor-pointer'
                  >
                    <Pencil /> Sửa
                  </Link>
                </Button>
                <ConfirmationButton
                  title='Xác nhận gỡ sản phẩm'
                  prompt='Sản phẩm sẽ bị ẩn, chỉ bạn mới có thể thấy sản phẩm. Bạn có chắc chắn muốn gỡ sản phẩm này không?'
                >
                  <ArrowDown /> Gỡ xuống
                </ConfirmationButton>
                <ConfirmationButton
                  variant='destructive'
                  title='Xác nhận xóa sản phẩm'
                  prompt='Sản phẩm sẽ bị xóa hoàn toàn khỏi nền tảng. Bạn có chắc chắn muốn xóa sản phẩm này không?'
                >
                  <Trash2 /> Xóa
                </ConfirmationButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mô tả sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.data.product.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Đánh giá</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.data.product.description}</p>
        </CardContent>
      </Card>
    </>
  )
}

export default ProductCard
