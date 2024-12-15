'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart'

const data = [
  { month: 'Thg1', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg2', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg3', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg4', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg5', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg6', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg7', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg8', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg9', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg10', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg11', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
  { month: 'Thg12', total: (Math.floor(Math.random() * 5000) + 1000) / 1000.0 },
]

const chartConfig = {
  total: {
    label: 'Doanh số',
    color: 'hsl(var(--primary))',
  },
}

export default function MonthlySalesChart() {
  return (
    <Card className='col-span-4'>
      <CardHeader>
        <CardTitle>Doanh số hàng tháng</CardTitle>
        <CardDescription>Thg1 - Thg12 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer
          width='100%'
          height={350}
        >
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={true}
                tickFormatter={(value) => `${value}${value != 0 ? ' tỷ ₫' : ''}`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey='total'
                fill='var(--color-total)'
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
