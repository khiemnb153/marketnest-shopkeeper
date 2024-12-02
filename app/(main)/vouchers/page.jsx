'use client'

import { useState, useEffect, use } from 'react'
import { buildUrl } from '@lib/utils'
import { useRouter } from 'next/navigation'

import { Search, Plus } from 'lucide-react'

import AppWrapper from '@components/app-wrapper'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import Link from 'next/link'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@components/ui/select'

import DataBlock from '@components/data-block'
import VoucherTable from './voucher-table'

const mockData = {
  data: {
    vouchers: [
      {
        id: 1,
        code: 'KM2024',
        campaign: 'Tết Sale',
        limits: 1000,
        used: 450,
        status: 'active',
      },
      {
        id: 2,
        code: 'FOOD50',
        campaign: 'Ưu Đãi Món Ăn',
        limits: 500,
        used: 320,
        status: 'active',
      },
      {
        id: 3,
        code: 'FREESHIP',
        campaign: 'Giao Hàng Miễn Phí',
        limits: 10000,
        used: 8760,
        status: 'active',
      },
      {
        id: 4,
        code: 'SUMMER23',
        campaign: 'Mùa Hè Rực Rỡ',
        limits: 1500,
        used: 1500,
        status: 'expired',
      },
      {
        id: 5,
        code: 'COFFEE10',
        campaign: 'Giảm Giá Cà Phê',
        limits: 700,
        used: 560,
        status: 'active',
      },
      {
        id: 6,
        code: 'BLACKFRI',
        campaign: 'Black Friday',
        limits: 3000,
        used: 2890,
        status: 'active',
      },
      {
        id: 7,
        code: 'MIDNIGHTSALE',
        campaign: 'Khuyến Mãi Nửa Đêm',
        limits: 100,
        used: 30,
        status: 'active',
      },
      {
        id: 8,
        code: 'VIPSALE',
        campaign: 'Chỉ Dành Cho Khách Hàng VIP',
        limits: 50,
        used: 10,
        status: 'active',
      },
      {
        id: 9,
        code: 'BACK2SCHOOL',
        campaign: 'Quà Tặng Khai Giảng',
        limits: 2000,
        used: 1500,
        status: 'active',
      },
      {
        id: 10,
        code: 'HOLIDAY50',
        campaign: 'Giảm Giá Dịp Lễ',
        limits: 1200,
        used: 850,
        status: 'active',
      },
    ],
    pageSize: 10,
    pageIndex: 1,
    count: 10,
    totalPages: 1,
  },
}

const VouchersPage = ({ searchParams }) => {
  const query = use(searchParams)

  const { pageIndex = 1 } = query
  const [pageSize, setPageSize] = useState(query.pageSize || 10)
  const [searchName, setSearchName] = useState(query.searchName || '')

  const router = useRouter()

  useEffect(() => {
    router.push(buildUrl('/vouchers', { pageIndex: 1, pageSize, searchName }))
  }, [pageSize])

  return (
    <AppWrapper
      title='Quản lý ưu đãi'
      className='flex flex-col gap-4'
    >
      <div className='flex-row-gap-4 flex justify-between'>
        <div className='flex flex-row gap-4'>
          <Button
            asChild
            className='px-3'
          >
            <Link href={'/vouchers/new'}>
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
              <Link href={buildUrl('/vouchers', { pageIndex, pageSize, searchName })}>
                <Search />
              </Link>
            </Button>
          </div>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <Select
            value={pageSize}
            onValueChange={(value) => setPageSize(value)}
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

      {/* <DataBlock
        api={'/shopkeepers/products'}
        searchParams={{ pageIndex: parseInt(pageIndex), pageSize: parseInt(pageSize), searchName: query.searchName || '' }}
        renderTemplate={ProductTable}
        loadingSkeletion={<ProductLoadingSkeleton />}
        errorUI={<span>Error</span>}
      /> */}
      <VoucherTable
        data={mockData}
        searchParams={{ pageIndex: parseInt(pageIndex), pageSize: parseInt(pageSize), searchName: query.searchName || '' }}
      />
    </AppWrapper>
  )
}

export default VouchersPage
