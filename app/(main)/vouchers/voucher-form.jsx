'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import voucherSchema from './voucher-schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const getLocalDateTime = (datetime) => {
  const inputDateTime = datetime ? new Date(datetime) : new Date()
  return new Date(inputDateTime - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 16)
}

export default function VoucherForm({ defaultValues, title, description, mode, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      code: defaultValues?.code || '',
      campaign: defaultValues?.campaign || '',
      description: defaultValues?.description || '',
      discountPercentage: defaultValues?.discountPercentage || 0,
      conditions: defaultValues?.conditions || {
        max_value: 0,
        min_value: 0,
      },
      quantity: defaultValues?.quantity || 0,
      validUntil: defaultValues?.validUntil ? getLocalDateTime(defaultValues.validUntil) : getLocalDateTime(),
      status: defaultValues?.status || 'Active',
    },
  })

  const handleSubmit = (data) => {
    onSubmit({ ...data, validUntil: new Date(data.validUntil) })
  }

  return (
    <Card className='mx-auto w-full max-w-2xl'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã khuyến mãi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nhập mã khuyến mãi'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='campaign'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chương trình khuyến mãi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nhập tên chương trình'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Nhập mô tả cho khuyến mãi'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='discountPercentage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm (%)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value || 0))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='quantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới hạn lượt dùng</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value || 0))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='conditions.min_value'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Áp dụng cho đơn từ (₫)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value || 0))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='conditions.max_value'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm tối đa (₫)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value || 0))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='validUntil'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hạn sử dụng</FormLabel>
                  <FormControl>
                    <Input
                      type='datetime-local'
                      {...field}
                      value={getLocalDateTime(field.value)}
                      onChange={(e) => {
                        field.onChange(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode != 'edit' && (
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái mặc định</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Active'>Kích hoạt</SelectItem>
                        <SelectItem value='Inactive'>Dừng</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type='submit'
          onClick={form.handleSubmit(handleSubmit)}
          className='w-full'
        >
          Lưu
        </Button>
      </CardFooter>
    </Card>
  )
}
