'use client'

import AppWrapper from '@components/app-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'

import DailyOrdersChart from './daily-orders-chart'
import MonthlySalesChart from './monthly-sales-chart'
import ProductCategoryChart from './product-category-chart'

export default function Home() {
  return (
    <AppWrapper
      title='Trang chủ'
      className={'grid gap-4 md:grid-cols-2 lg:grid-cols-4'}
    >
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Tổng doanh thu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>145 triệu ₫</div>
          <p className='text-xs text-muted-foreground'>+32.56% so với tháng trước</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+357</div>
          <p className='text-xs text-muted-foreground'>+67.1% so với tháng trước</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Doanh số</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+1,863</div>
          <p className='text-xs text-muted-foreground'>+24% so với tháng trước</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>687</div>
          <p className='text-xs text-muted-foreground'>+104 so với tháng trước</p>
        </CardContent>
      </Card>
      <MonthlySalesChart />
      <DailyOrdersChart />
      <ProductCategoryChart />
    </AppWrapper>
  )
}
