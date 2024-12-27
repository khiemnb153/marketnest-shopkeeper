'use client'

import { useState, use } from 'react'
import { buildUrl } from '@lib/utils'
import { useRouter } from 'next/navigation'
import useFetch from '@hooks/use-fetch'

import { Search, Plus } from 'lucide-react'

import AppWrapper from '@components/app-wrapper'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import Link from 'next/link'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@components/ui/select'

import CommonPagination from '@components/common-pagination'
import VoucherTable, { VoucherTableSkeleton } from './voucher-table'

const VouchersPage = ({ searchParams }) => {
  const router = useRouter()
  const query = use(searchParams)

  const pageIndex = parseInt(query.pageIndex) || 1
  const [pageSize, setPageSize] = useState(parseInt(query.pageSize) || 10)
  const [searchName, setSearchName] = useState(query.searchName || '')

  const { data, error, isLoading } = useFetch(buildUrl('/discounts', { pageIndex, pageSize, owner: 'shopkeeper' }))

  console.log(data)

  const renderVoucherTable = () => {
    if (isLoading) {
      return <VoucherTableSkeleton pageSize={pageSize} />
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
      <VoucherTable
        vouchers={data.discounts}
        searchParams={{ pageIndex, pageSize, searchName }}
      />
    )
  }

  return (
    <AppWrapper
      title='Quản lý khuyến mãi'
      className='flex flex-col gap-4'
    >
      <div className='flex-row-gap-4 flex justify-between'>
        <div className='flex flex-row gap-4'>
          <Button asChild>
            <Link href={buildUrl('/vouchers/new')}>
              <Plus /> Thêm
            </Link>
          </Button>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <Select
            value={pageSize}
            onValueChange={(value) => {
              setPageSize(value)
              router.push(buildUrl('/vouchers', { pageIndex: 1, pageSize: value, searchName }))
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

      {renderVoucherTable()}

      {!!data && (
        <CommonPagination
          route={'/vouchers'}
          searchParams={{ pageIndex, pageSize, searchName }}
          totalPages={data.totalPages}
        />
      )}
    </AppWrapper>
  )
}

export default VouchersPage
