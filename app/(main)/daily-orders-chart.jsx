'use client'

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart'

const data = [
  { day: 'T2', orders: Math.floor(Math.random() * 100) + 50 },
  { day: 'T3', orders: Math.floor(Math.random() * 100) + 50 },
  { day: 'T4', orders: Math.floor(Math.random() * 100) + 50 },
  { day: 'T5', orders: Math.floor(Math.random() * 100) + 50 },
  { day: 'T6', orders: Math.floor(Math.random() * 100) + 50 },
  { day: 'T7', orders: Math.floor(Math.random() * 100) + 50 },
  { day: 'CN', orders: Math.floor(Math.random() * 100) + 50 },
]

const chartConfig = {
  order: {
    label: 'Đơn hàng',
    color: 'hsl(var(--chart-2))',
  },
}

export default function DailyOrdersChart() {
  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle>Đơn hàng hằng ngày</CardTitle>
        <CardDescription>Tuần này</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='day'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Line
              dataKey='orders'
              type='natural'
              stroke='var(--color-order)'
              strokeWidth={2}
              dot={{
                fill: 'var(--color-order)',
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position='top'
                offset={12}
                className='fill-foreground'
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
