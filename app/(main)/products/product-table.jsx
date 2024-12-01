import currency from '@lib/currency'
import { buildUrl } from '@lib/utils'

import { EllipsisVertical, Pencil, Info } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from '@/components/ui/pagination'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@components/ui/hover-card'
import Link from 'next/link'
import Image from 'next/image'

const ProductTable = ({ data, searchParams }) => {
  const { pageIndex, pageSize, searchName } = searchParams

  const renderPageLink = (pageNumber) => (
    <PaginationItem key={`page${pageNumber}`}>
      <PaginationLink
        href={buildUrl('/products', {
          pageIndex: pageNumber,
          pageSize: pageSize,
          searchName: searchName,
        })}
        isActive={pageNumber == pageIndex}
      >
        {pageNumber}
      </PaginationLink>
    </PaginationItem>
  )

  const renderEllipsis = () => (
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
  )

  return (
    <>
      <Table>
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
          {data.data.products.map((product, index) => (
            <TableRow key={product.id}>
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
                        <Link
                          href={`/products/${product.id}`}
                          className='cursor-pointer'
                        >
                          <Info /> Chi tiết
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/products/${product.id}/edit`}
                          className='cursor-pointer'
                        >
                          <Pencil /> Sửa
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={buildUrl('/products', {
                pageIndex: pageIndex - 1,
                pageSize: pageSize,
                searchName: searchName,
              })}
              onClick={(e) => {
                if (pageIndex == 1) e.preventDefault()
              }}
            />
          </PaginationItem>

          {renderPageLink(1)}

          {pageIndex > 3 && renderEllipsis()}

          {pageIndex > 2 && renderPageLink(pageIndex - 1)}
          {pageIndex != 1 && pageIndex != data.data.totalPages && renderPageLink(pageIndex)}
          {pageIndex < data.data.totalPages - 1 && renderPageLink(pageIndex + 1)}

          {pageIndex < data.data.totalPages - 2 && renderEllipsis()}

          {data.data.totalPages !== 1 && renderPageLink(data.data.totalPages)}

          <PaginationItem>
            <PaginationNext
              href={buildUrl('/products', {
                pageIndex: pageIndex + 1,
                pageSize: pageSize,
                searchName: searchName,
              })}
              onClick={(e) => {
                if (pageIndex == data.data.totalPages) e.preventDefault()
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default ProductTable
