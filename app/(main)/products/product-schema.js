import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  description: z.string().min(1, 'Mô tả sản phẩm là bắt buộc'),
  price: z.number().gt(0, 'Giá sản phẩm phải lớn hơn 0'),
  stock: z.number().int().gt(0, 'Số lượng phải là số nguyên lớn hơn 0'),
  categories: z
    .array(
      z.object({
        value: z.string().min(1, 'Danh mục phải có ID'),
        label: z.any().optional(), // `label` is optional for flexibility
      })
    )
    .min(1, 'Sản phẩm phải thuộc ít nhất một danh mục'),
  images: z
    .array(
      z.object({
        src: z.instanceof(File).optional(),
        preview: z.string(),
        id: z.string(),
        uploaded: z.boolean(),
      })
    )
    .min(1, 'Phải có ít nhất một tệp hình ảnh hợp lệ'),
})

export default productSchema
