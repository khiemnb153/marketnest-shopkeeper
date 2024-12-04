'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { cn } from '@lib/utils'
import productSchema from '../product-schema'

import { Plus, X, GripVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@components/ui/textarea'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@components/ext/multi-select'
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area'
import Image from 'next/image'

import AppWrapper from '@components/app-wrapper'

// dummy
const categories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Fashion' },
  { id: '3', name: 'Home & Garden' },
  { id: '4', name: 'Sports & Outdoors' },
  { id: '5', name: 'Health & Beauty' },
  { id: '6', name: 'Toys & Games' },
  { id: '7', name: 'Books' },
  { id: '8', name: 'Automotive' },
  { id: '9', name: 'Music' },
  { id: '10', name: 'Pet Supplies' },
]

const NewProductPage = () => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categories: [],
      images: [],
    },
  })

  const onDrop = useCallback(
    (acceptedFiles) => {
      form.setValue(
        'images',
        [
          ...form.getValues('images'),
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file), id: Math.random().toString(36).substring(7) })
          ),
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

  const removeFile = (id) => {
    const updatedImages = form.getValues('images').filter((f) => f.id !== id)
    form.setValue('images', updatedImages, { shouldValidate: true })
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(form.getValues('images'))
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    form.setValue('images', items, { shouldValidate: true })
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  const images = form.watch('images')

  return (
    <AppWrapper
      title='Thêm sản phẩm'
      routeTree={[{ url: '/products', name: 'Quản lý sản phẩm' }]}
    >
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
                <FormLabel>Giá</FormLabel>
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
                  <MultiSelector
                    onValuesChange={field.onChange}
                    values={field.value}
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder='Chọn các danh mục' />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {categories.map((category) => (
                          <MultiSelectorItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
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
                <FormLabel>Hình ảnh</FormLabel>
                <FormControl>
                  <div className='flex gap-4'>
                    {/* Dropzone */}
                    <div
                      {...getRootProps()}
                      className={cn(
                        'flex aspect-square h-40 w-40 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors',
                        isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25 hover:border-primary'
                      )}
                    >
                      <input {...getInputProps()} />
                      <Plus className='h-8 w-8 text-muted-foreground' />
                    </div>

                    {/* Preview Section */}
                    <ScrollArea>
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable
                          droppableId='images'
                          isDropDisabled={false}
                          isCombineEnabled={false}
                          ignoreContainerClipping={false}
                        >
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className='flex gap-4'
                            >
                              {images.map((file, index) => (
                                <Draggable
                                  key={file.id}
                                  draggableId={file.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className='group relative flex aspect-square flex-shrink-0 items-center'
                                    >
                                      <Image
                                        src={file.preview}
                                        alt={file.name}
                                        width={160}
                                        height={160}
                                        className='rounded-md object-cover'
                                        onLoad={() => {
                                          URL.revokeObjectURL(file.preview)
                                        }}
                                      />
                                      <button
                                        type='button'
                                        onClick={() => removeFile(file.id)}
                                        className='absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                                        aria-label={`Remove ${file.name}`}
                                      >
                                        <X className='h-4 w-4' />
                                      </button>
                                      <div
                                        {...provided.dragHandleProps}
                                        className='absolute bottom-2 left-2 cursor-move rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                                      >
                                        <GripVertical className='h-4 w-4' />
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                      <ScrollBar orientation='horizontal' />
                    </ScrollArea>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Đăng bán</Button>
        </form>
      </Form>
    </AppWrapper>
  )
}

export default NewProductPage
