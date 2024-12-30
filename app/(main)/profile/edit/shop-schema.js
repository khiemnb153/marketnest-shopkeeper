import { z } from 'zod'

const shopSchema = z.object({
  name: z.string().min(1, 'Tên cửa hàng là bắt buộc'),
  description: z.string().optional(),
  image: z.string().optional(),
  city: z.string().min(1, 'Quận/Huyện/TP là bắt buộc'),
  state: z.string().min(1, 'Tỉnh là bắt buộc'),
  country: z.string().min(1, 'Quốc gia là bắt buộc'),
  address: z.string().optional(),
  categories: z
    .array(
      z.object({
        value: z.string().min(1, 'Danh mục phải có ID'),
        label: z.any().optional(), // `label` is optional for flexibility
      })
    )
    .min(1, 'Cửa hàng phải thuộc ít nhất một danh mục'),
})

export default shopSchema
