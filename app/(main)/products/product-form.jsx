'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@lib/utils'

import productSchema from './product-schema'

import { ImagePlus, X, Loader } from 'lucide-react'

import { Button } from '@components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Textarea } from '@components/ui/textarea'
import CategoriesSelector from '@components/categories-selector'
import { Skeleton } from '@components/ui/skeleton'
import Image from 'next/image'

const ProductForm = ({ defaultValues, onSubmit, submitting, actionLabel }) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      price: defaultValues?.price || 0,
      stock: defaultValues?.stock || 0,
      categories: defaultValues?.categories || [],
      images: defaultValues?.images || [],
    },
  })

  const onDrop = useCallback(
    (acceptedFiles) => {
      form.setValue(
        'images',
        [
          ...form.getValues('images'),
          ...acceptedFiles.map((file) => ({
            src: file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substring(7),
            uploaded: false,
          })),
        ],
        { shouldValidate: true }
      )
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  })

  const handleRemoveImage = (id) => {
    const updatedImages = form.getValues('images').filter((f) => f.id !== id)
    form.setValue('images', updatedImages, { shouldValidate: true })
  }

  const handleSetMainImage = (id) => {
    const images = form.getValues('images')

    const filteredImages = images.filter((img) => img.id !== id)
    const targetImage = images.find((img) => img.id === id)

    form.setValue('images', [targetImage, ...filteredImages], { shouldValidate: true })
  }

  const images = form.watch('images')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Mô tả sản phẩm</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá ($)</FormLabel>
              <FormControl>
                <Input
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
          name='stock'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng</FormLabel>
              <FormControl>
                <Input
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

        <FormField
          control={form.control}
          name='images'
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Hình ảnh ({images.length})</FormLabel>
              <FormControl>
                <div className='flex flex-wrap gap-4'>
                  {/* Dropzone */}
                  <div
                    {...getRootProps()}
                    className={cn(
                      'flex aspect-square h-40 w-40 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors',
                      isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25 hover:border-primary'
                    )}
                  >
                    <input {...getInputProps()} />
                    <ImagePlus className='h-8 w-8 text-muted-foreground' />
                  </div>

                  {/* Preview Section */}
                  {images.map((image) => (
                    <div
                      className='group relative flex aspect-square flex-shrink-0 items-center'
                      key={image.id}
                    >
                      <Image
                        src={image.preview}
                        alt={image.src?.name || 'A product image'}
                        width={160}
                        height={160}
                        className='h-40 w-40 rounded-md object-cover'
                        onLoad={() => {
                          URL.revokeObjectURL(image.preview)
                        }}
                      />
                      <button
                        type='button'
                        onClick={() => handleRemoveImage(image.id)}
                        className='absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                        aria-label={`Remove ${image.src?.name || 'A product image'}`}
                      >
                        <X className='h-4 w-4' />
                      </button>
                      <button
                        type='button'
                        onClick={() => handleSetMainImage(image.id)}
                        className='absolute bottom-2 left-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                        aria-label={`Set ${image.src?.name || 'A product image'} as main image`}
                      >
                        Đặt lên đầu
                      </button>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={submitting}
        >
          {submitting ? <Loader className='animate-spin' /> : actionLabel}
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm

export const ProductFormSkeleton = () => {
  return (
    <div className='space-y-4'>
      {/* Name field */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='h-10 w-full' />
      </div>

      {/* Description field */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[150px]' />
        <Skeleton className='h-20 w-full' />
      </div>

      {/* Price field */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[80px]' />
        <Skeleton className='h-10 w-full' />
      </div>

      {/* Stock field */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='h-10 w-full' />
      </div>

      {/* Categories field */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[120px]' />
        <Skeleton className='h-10 w-full' />
      </div>

      {/* Images field */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[150px]' />
        <div className='flex flex-wrap gap-4'>
          {/* Dropzone placeholder */}
          <div className='flex aspect-square h-40 w-40 flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25'>
            <ImagePlus className='h-8 w-8 text-muted-foreground' />
          </div>
          {/* Image preview placeholders */}
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className='h-40 w-40 rounded-md'
            />
          ))}
        </div>
      </div>
      <Skeleton className='h-10 w-[100px]' />
    </div>
  )
}
