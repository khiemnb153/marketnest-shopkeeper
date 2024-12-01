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
import ProductTable from './product-table'
import ProductLoadingSkeleton from './product-loading-skeletion'

const ProductsPage = ({ searchParams }) => {
  const query = use(searchParams)

  const { pageIndex = 1 } = query
  const [pageSize, setPageSize] = useState(query.pageSize || 10)
  const [searchName, setSearchName] = useState(query.searchName || '')

  const router = useRouter()

  useEffect(() => {
    router.push(buildUrl('/products', { pageIndex: 1, pageSize, searchName }))
  }, [pageSize])

  return (
    <AppWrapper
      title='Quản lý sản phẩm'
      className='flex flex-col gap-4'
    >
      <div className='flex-row-gap-4 flex justify-between'>
        <div className='flex flex-row gap-4'>
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
              variant='ghost'
              className='px-3'
              asChild
            >
              <Link href={buildUrl('/products', { pageIndex, pageSize, searchName })}>
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

      <DataBlock
        api={'/shopkeepers/products'}
        searchParams={{ pageIndex: parseInt(pageIndex), pageSize: parseInt(pageSize), searchName: query.searchName || '' }}
        renderTemplate={ProductTable}
        loadingSkeletion={<ProductLoadingSkeleton />}
        errorUI={<span>Error</span>}
      />
    </AppWrapper>
  )
}

export default ProductsPage
