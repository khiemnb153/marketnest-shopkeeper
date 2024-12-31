import currency from '@lib/currency'
import { buildUrl } from '@lib/utils'
import { useRouter } from 'next/navigation'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Skeleton } from '@components/ui/skeleton'
import { Badge } from '@components/ui/badge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@components/ui/hover-card'
import Image from 'next/image'

import ProductStatusBadge from './product-status-badge'

const ProductTable = ({ products, searchParams }) => {
  console.log(products)

  const router = useRouter()
  const { pageIndex, pageSize, searchName } = searchParams

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Sản phẩm</TableHead>
          <TableHead className='text-right'>Giá</TableHead>
          <TableHead className='text-center'>Có sẵn</TableHead>
          <TableHead className='text-center'>Rating</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow
            key={product.id}
            className='cursor-pointer'
            onClick={() => {
              router.push(`/products/${product.id}`)
            }}
          >
            <TableCell className='text-center'>{(pageIndex - 1) * pageSize + index + 1}</TableCell>
            <TableCell className='font-medium'>
              <div className='flex flex-row items-center gap-2'>
                <HoverCard openDelay={500}>
                  <HoverCardTrigger asChild>
                    <Avatar className='h-8 w-8 rounded-lg'>
                      <AvatarImage
                        src={product.images[0]}
                        alt={product.name}
                        className='object-cover'
                      />
                      <AvatarFallback className='rounded-lg'>℗</AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent className='w-fit'>
                    {!!product?.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={200}
                        height={200}
                      />
                    ) : (
                      <span className='italic'>Không có hình ảnh</span>
                    )}
                  </HoverCardContent>
                </HoverCard>

                {product.name}
              </div>
            </TableCell>
            <TableCell className='text-right'>{currency.format(product.price)}</TableCell>
            <TableCell className='text-center'>{product.stock}</TableCell>
            <TableCell className='text-center'>{product.rate}</TableCell>
            <TableCell className='text-center'>
              <ProductStatusBadge status={product.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProductTable

export const ProductTableSkeleton = ({ pageSize }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>#</TableHead>
          <TableHead>Sản phẩm</TableHead>
          <TableHead className='text-right'>Giá</TableHead>
          <TableHead className='text-center'>Có sẵn</TableHead>
          <TableHead className='text-center'>Rating</TableHead>
          <TableHead className='text-center'>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: pageSize || 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-4' />
            </TableCell>
            <TableCell>
              <div className='flex flex-row items-center gap-2'>
                <Skeleton className='h-8 w-8 rounded-lg' />
                <Skeleton className='h-4 w-32' />
              </div>
            </TableCell>
            <TableCell className='text-right'>
              <Skeleton className='ml-auto h-4 w-16' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-8' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-4 w-8' />
            </TableCell>
            <TableCell className='text-center'>
              <Skeleton className='mx-auto h-6 w-16' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
