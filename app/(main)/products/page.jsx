'use client'

import { useSWRConfig } from 'swr'
import useFetch from '@hooks/use-fetch'
import currency from '@lib/currency'
import { use, useState } from 'react'
import { buildUrl } from '@lib/utils'

import { EllipsisVertical, Search, Plus } from 'lucide-react'

import AppWrapper from '@components/app-wrapper'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Badge } from '@components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

const ProductsPage = ({ searchParams }) => {
  const query = use(searchParams)
  const { pageIndex = 1, pageSize = 25 } = query
  const [searchName, setSearchName] = useState(query.searchName || '')

  const { accessToken } = useSWRConfig()
  const {
    data: response,
    error,
    isLoading,
  } = useFetch(buildUrl('/shopkeepers/products', { pageIndex, pageSize, searchName: query.searchName || '' }), accessToken)

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
    <AppWrapper title='Quản lý sản phẩm'>
      <div className='flex-row-gap-4 flex justify-between'>
        <Button
          asChild
          className='px-3'
        >
          <Link href={'/products/new'}>
            <Plus /> Thêm
          </Link>
        </Button>
        <div className='flex flex-row gap-2'>
          <Input
            className='w-56'
            placeholder='Nhập từ khóa để tìm kiếm...'
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button
            asChild
            variant='ghost'
            className='px-3'
          >
            <Link href={buildUrl('/products', { pageIndex, pageSize, searchName })}>
              <Search />
            </Link>
          </Button>
        </div>

        <div className='flex flex-row gap-4'>
          <Pagination className='m-0 w-fit'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={buildUrl('/products', { pageIndex: pageIndex - 1, pageSize, searchName })}
                  onClick={(e) => {
                    if (pageIndex == 1) e.preventDefault()
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                {pageIndex}/{response.data.totalPages}
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href={buildUrl('/products', { pageIndex: parseInt(pageIndex) + 1, pageSize, searchName })}
                  onClick={(e) => {
                    if (pageIndex == response.data.totalPages) e.preventDefault()
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className='flex flex-row items-center gap-2'>
            <Label htmlFor='pageSize'>Kích thước trang: </Label>
            <ToggleGroup
              type='single'
              id='pageSize'
              value={pageSize}
            >
              <ToggleGroupItem
                value='10'
                asChild
              >
                <Link href={buildUrl('/products', { pageIndex: 1, pageSize: 10, searchName })}>10</Link>
              </ToggleGroupItem>
              <ToggleGroupItem
                value='25'
                asChild
              >
                <Link href={buildUrl('/products', { pageIndex: 1, pageSize: 25, searchName })}>25</Link>
              </ToggleGroupItem>
              <ToggleGroupItem
                value='50'
                asChild
              >
                <Link href={buildUrl('/products', { pageIndex: 1, pageSize: 50, searchName })}>50</Link>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      <Table className='mt-4'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>#</TableHead>
            <TableHead>Sản phẩm</TableHead>
            <TableHead className='text-right'>Giá</TableHead>
            <TableHead className='text-center'>Có sẵn</TableHead>
            <TableHead className='text-center'>Rating</TableHead>
            <TableHead className='text-center'>Trạng thái</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.data.products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className='text-center'>{(pageIndex - 1) * pageSize + index + 1}</TableCell>
              <TableCell className='font-medium'>
                <div className='flex flex-row items-center gap-2'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage
                      src={product.images[0]}
                      alt={product.name}
                      className='object-cover'
                    />
                    <AvatarFallback className='rounded-lg'>℗</AvatarFallback>
                  </Avatar>
                  {product.name}
                </div>
              </TableCell>
              <TableCell className='text-right'>{currency.format(product.price)}</TableCell>
              <TableCell className='text-center'>{product.stock}</TableCell>
              <TableCell className='text-center'>{product.rate}</TableCell>
              <TableCell className='text-center'>
                <Badge
                  variant='outline'
                  className='border-green-600 text-green-600 dark:border-green-500 dark:text-green-500'
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='h-8 w-8 p-2'
                    >
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href={`/products/${product.id}`}>Chi tiết</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/products/${product.id}/edit`}>Sửa</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppWrapper>
  )
}

export default ProductsPage
