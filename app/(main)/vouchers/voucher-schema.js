import { z } from 'zod'

const voucherSchema = z.object({
  code: z.string().min(1, 'Mã khuyến mãi là bắt buộc'),
  campaign: z.string().min(1, 'Chương trình khuyến mãi là bắt buộc'),
  description: z.string().optional(),
  discountPercentage: z.number().min(1).max(100, 'Giá trị phần trăm không hợp lệ'),
  conditions: z.object({
    max_value: z.number().min(1, 'Bắt buộc'),
    min_value: z.number().min(0, 'Bắt buộc'),
  }),
  quantity: z.number().min(1, 'Số lượng phải là một số dương'),
  validUntil: z.string().refine((val) => !isNaN(new Date(val).getTime()), 'Thời gian không hợp lệ'),
  status: z.enum(['Active', 'Inactive']),
})

export default voucherSchema
