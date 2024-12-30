'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mutate, useSWRConfig } from 'swr'
import { postImage } from '@lib/post-media'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Loader, X } from 'lucide-react'

import shopSchema from './shop-schema'

import { Button } from '@components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Textarea } from '@components/ui/textarea'
import Image from 'next/image'
import CategoriesSelector from '@components/categories-selector'

const ShopEditForm = ({ shop }) => {
  const { accessToken } = useSWRConfig()
  const router = useRouter()

  const [newBanner, setNewBanner] = useState(null)
  const [submiting, setSubmiting] = useState(false)

  const form = useForm({
    resolver: zodResolver(shopSchema),
    defaultValues: { ...shop, categories: shop.categories.map((cat) => ({ value: cat.id, label: cat.name })) },
  })

  const onSubmit = async (data) => {
    setSubmiting(true)

    if (newBanner && !data.image) {
      const imageUrl = await postImage(newBanner, accessToken)
      if (imageUrl) {
        data.image = imageUrl
      }
    }

    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/shopkeepers/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ...data,
        categories: data.categories.map((cat) => cat.value),
      }),
    })

    setSubmiting(false)

    if (!res.ok) {
      toast.error(`Cập nhật hồ sơ cửa hàng thất bại. Code: ${res.status}`)
      return
    }

    toast.success('Cập nhật hồ sơ cửa hàng thành công')
    mutate('/shopkeepers/me')
    router.push('/profile')
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]

    if (file) {
      setNewBanner(file)
      form.setValue('image', '')
    }
  }

  const image = form.watch('image')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên cửa hàng</FormLabel>
              <FormControl>
                <Input
                  placeholder='Nhập tên cửa hàng'
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
                  placeholder='Mô tả cửa hàng'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner</FormLabel>
              <FormControl>
                <div className='flex flex-col gap-2'>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                  />
                  {!!image && (
                    <div className='group relative flex w-fit flex-shrink-0 items-center'>
                      <Image
                        src={image}
                        alt='shopBanner'
                        width={500}
                        height={200}
                        className='rounded-md object-cover'
                      />
                      <button
                        type='button'
                        onClick={() => form.setValue('image', '')}
                        className='absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                        aria-label={`Remove shop banner`}
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                  )}
                  {!!newBanner && (
                    <div className='group relative flex w-fit flex-shrink-0 items-center'>
                      <Image
                        src={URL.createObjectURL(newBanner)}
                        alt='shopBanner'
                        width={500}
                        height={200}
                        className='rounded-md object-cover'
                      />
                      <button
                        type='button'
                        onClick={() => setNewBanner(null)}
                        className='absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                        aria-label={`Remove shop banner`}
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input
                  placeholder='Nhập địa chỉ'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-3 gap-4'>
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quốc gia</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập quốc gia'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='state'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tỉnh</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập tỉnh'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quận/Huyện/TP</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập quận, huyện, hoặc TP'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='categories'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Danh mục</FormLabel>
              <FormControl>
                <CategoriesSelector
                  onValuesChange={field.onChange}
                  values={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={submiting}
        >
          {submiting ? <Loader className='animate-spin' /> : 'Cập nhật'}
        </Button>
      </form>
    </Form>
  )
}

export default ShopEditForm
