'use client'

import { Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from '@components/ui/chart'

const data = [
  { category: 'cat1', buys: 400, fill: 'var(--color-cat1)' },
  { category: 'cat2', buys: 300, fill: 'var(--color-cat2)' },
  { category: 'cat3', buys: 200, fill: 'var(--color-cat3)' },
  { category: 'cat4', buys: 100, fill: 'var(--color-cat4)' },
  { category: 'catOther', buys: 50, fill: 'var(--color-catOther)' },
]

const chartConfig = {
  buys: {
    label: 'Lượng mua',
  },
  cat1: {
    label: 'Điện tử',
    color: 'hsl(var(--chart-1))',
  },
  cat2: {
    label: 'Thời trang',
    color: 'hsl(var(--chart-2))',
  },
  cat3: {
    label: 'Sách',
    color: 'hsl(var(--chart-3))',
  },
  cat4: {
    label: 'Đồ chơi',
    color: 'hsl(var(--chart-4))',
  },
  catOther: {
    label: 'Khác',
    color: 'hsl(var(--chart-5))',
  },
}
export default function ProductCategoryChart() {
  return (
    <Card className='col-span-2 flex flex-col'>
      <CardHeader className=''>
        <CardTitle>Danh mục sản phẩm</CardTitle>
        <CardDescription>Thg1 - Thg12 2024</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[400px]'
        >
          <PieChart>
            <Pie
              data={data}
              dataKey='buys'
            />
            <ChartLegend
              content={<ChartLegendContent nameKey='category' />}
              className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
