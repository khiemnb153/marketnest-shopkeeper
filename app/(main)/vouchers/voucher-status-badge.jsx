import { Badge } from '@/components/ui/badge'

const VoucherStatusBadge = ({ status, variant = 'outline' }) => {
  switch (status.toUpperCase()) {
    case 'ACTIVE':
      return (
        <Badge
          variant={variant}
          className={
            variant == 'default'
              ? 'bg-green-600 hover:bg-green-600 dark:bg-green-500'
              : 'border-green-600 text-green-600 dark:border-green-500 dark:text-green-500'
          }
        >
          Hoạt động
        </Badge>
      )

    case 'INACTIVE':
      return (
        <Badge
          variant={variant}
          className={
            variant == 'default'
              ? 'bg-red-600 hover:bg-red-600 dark:bg-red-500'
              : 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
          }
        >
          Đã dừng
        </Badge>
      )

    default:
      return (
        <Badge
          variant={variant}
          className={
            variant == 'default'
              ? 'bg-gray-600 hover:bg-gray-600 dark:bg-gray-500'
              : 'border-gray-600 text-gray-600 dark:border-gray-500 dark:text-gray-500'
          }
        >
          Unknown
        </Badge>
      )
  }
}

export default VoucherStatusBadge
