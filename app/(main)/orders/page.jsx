'use client'

import { useState, use } from 'react'
import { buildUrl } from '@lib/utils'
import useFetch from '@hooks/use-fetch'
import { useRouter } from 'next/navigation'

import { Search, Plus } from 'lucide-react'

import AppWrapper from '@components/app-wrapper'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@components/ui/select'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import Link from 'next/link'
import CommonPagination from '@components/common-pagination'

import OrderTable, { OrderTableSkeleton } from './order-table'

const OrdersPage = ({ searchParams }) => {
  const router = useRouter()
  const query = use(searchParams)

  const pageIndex = parseInt(query.pageIndex) || 1
  const [pageSize, setPageSize] = useState(parseInt(query.pageSize) || 10)
  const [searchName, setSearchName] = useState(query.searchName || '')

  const { data, error, isLoading } = useFetch(
    buildUrl('/shopkeepers/orders', { pageIndex, searchName: query.searchName || '', pageSize })
  )

  console.log(data)

  const renderOrderTable = () => {
    if (isLoading) {
      return <OrderTableSkeleton pageSize={pageSize} />
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
      <OrderTable
        orders={data.orders}
        searchParams={{ pageIndex, pageSize, searchName }}
      />
    )
  }

  return (
    <AppWrapper
      title='Quản lý đơn hàng'
      className='flex flex-col gap-4'
    >
      <div className='flex-row-gap-4 flex justify-between'>
        <div className='flex flex-row gap-4'>
          <Button
            asChild
            className='px-3'
          >
            <Link href={'/orders/new'}>
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
              variant='ghost'
              className='px-3'
              asChild
            >
              <Link href={buildUrl('/orders', { pageIndex: 1, pageSize, searchName })}>
                <Search />
              </Link>
            </Button>
          </div>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <Select
            value={pageSize}
            onValueChange={(value) => {
              setPageSize(value)
              router.push(buildUrl('/orders', { pageIndex: 1, pageSize: value, searchName }))
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

      {renderOrderTable()}

      {!!data && (
        <CommonPagination
          route={'/orders'}
          searchParams={{ pageIndex, pageSize, searchName }}
          totalPages={data.totalPages}
        />
      )}
    </AppWrapper>
  )
}

export default OrdersPage
