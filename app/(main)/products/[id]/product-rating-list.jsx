'use client'

import { useState } from 'react'
import { buildUrl } from '@lib/utils'
import useFetch from '@hooks/use-fetch'
import { useRouter } from 'next/navigation'
import { getAbbreviationName } from '@lib/utils'

import { Search, Star, StarHalf } from 'lucide-react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@components/ui/select'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
} from '@components/ui/pagination'

const ProductRatingList = ({ productId }) => {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, error, isLoading } = useFetch(buildUrl(`/ratings/${productId}`, { pageIndex, pageSize }))

  console.log(data)

  const renderRatingList = () => {
    if (isLoading) {
      return <span>Đang tải...</span>
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

    if (data.ratings.length == 0) {
      return <div className='text-center italic text-muted-foreground'>Chưa có đánh giá</div>
    }

    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {data.ratings.map((rating) => {
          const fullStars = Math.floor(rating.value)
          const hasHalfStar = rating.value % 1 !== 0
          return (
            <Card key={rating.id}>
              <CardHeader>
                <div className='flex flex-row items-center gap-2'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage
                      src={rating.user.avatar}
                      alt={rating.user.username}
                      className='object-cover'
                    />
                    <AvatarFallback className='rounded-lg'>
                      {getAbbreviationName(rating.user.username || 'User')}
                    </AvatarFallback>
                  </Avatar>
                  {rating.user.username}
                </div>
              </CardHeader>
              <CardContent>
                <div className='flex items-center'>
                  {[...Array(fullStars)].map((_, i) => (
                    <Star
                      key={i}
                      className='h-5 w-5 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                  {hasHalfStar && <StarHalf className='h-5 w-5 fill-yellow-400 text-yellow-400' />}
                  {[...Array(5 - Math.ceil(rating.value))].map((_, i) => (
                    <Star
                      key={i + fullStars}
                      className='h-5 w-5 text-gray-300'
                    />
                  ))}
                  <span className='ml-2 text-sm text-gray-600'>{rating.value.toFixed(1)}</span>
                </div>
                <p>{rating.comment}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  const renderPageLink = (pageNumber) => (
    <PaginationItem key={`page${pageNumber}`}>
      <PaginationLink
        href={'#'}
        onClick={(e) => {
          e.preventDefault()
          setPageIndex(pageNumber)
        }}
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
    <Card>
      <CardHeader>
        <CardTitle>Đánh giá</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex-row-gap-4 flex justify-between'>
          <div className='flex flex-row gap-4'></div>

          <div className='flex flex-row items-center gap-2'>
            <Select
              value={pageSize}
              onValueChange={(value) => {
                setPageSize(value)
                setPageIndex(1)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Kích thước trang' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Kích thước trang</SelectLabel>
                  <SelectItem value={10}>10</SelectItem>
                  <SelectItem value={25}>25</SelectItem>
                  <SelectItem value={50}>50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {renderRatingList()}

        {!!data && data.ratings.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={'#'}
                  onClick={(e) => {
                    e.preventDefault()
                    if (pageIndex > 1) setPageIndex((prev) => prev - 1)
                  }}
                />
              </PaginationItem>

              {renderPageLink(1)}

              {pageIndex > 3 && renderEllipsis()}

              {pageIndex > 2 && renderPageLink(pageIndex - 1)}
              {pageIndex != 1 && pageIndex != data.totalPages && renderPageLink(pageIndex)}
              {pageIndex < data.totalPages - 1 && renderPageLink(pageIndex + 1)}

              {pageIndex < data.totalPages - 2 && renderEllipsis()}

              {data.totalPages != 1 && renderPageLink(data.totalPages)}

              <PaginationItem>
                <PaginationNext
                  href={'#'}
                  onClick={(e) => {
                    e.preventDefault()
                    if (pageIndex < data.totalPages) setPageIndex((prev) => prev + 1)
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductRatingList
