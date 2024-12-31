import { Badge } from '@/components/ui/badge'

const RefundRequestStatusBadge = ({ status, variant = 'outline' }) => {
  switch (status.toUpperCase()) {
    case 'PENDING':
      return (
        <Badge
          variant={variant}
          className={
            variant == 'default'
              ? 'bg-yellow-600 hover:bg-yellow-600 dark:bg-yellow-500'
              : 'border-yellow-600 text-yellow-600 dark:border-yellow-500 dark:text-yellow-500'
          }
        >
          Chờ xử lý
        </Badge>
      )
    case 'ACCEPTED':
      return (
        <Badge
          variant={variant}
          className={
            variant == 'default'
              ? 'bg-blue-600 hover:bg-blue-600 dark:bg-blue-500'
              : 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
          }
        >
          Đã chấp nhận
        </Badge>
      )
    case 'REJECTED':
      return (
        <Badge
          variant={variant}
          className={
            variant == 'default'
              ? 'bg-red-600 hover:bg-red-600 dark:bg-red-500'
              : 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
          }
        >
          Đã từ chối
        </Badge>
      )
    case 'PROCESSING':
      return (
        <Badge
          variant={variant}
          className={
            variant == 'default'
              ? 'bg-blue-600 hover:bg-blue-600 dark:bg-blue-500'
              : 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
          }
        >
          Đang xử lý
        </Badge>
      )
    case 'COMPLETED':
      return (
        <Badge
          variant={variant}
          className={
            variant == 'default'
              ? 'bg-green-600 hover:bg-green-600 dark:bg-green-500'
              : 'border-green-600 text-green-600 dark:border-green-500 dark:text-green-500'
          }
        >
          Hoàn tất
        </Badge>
      )
    case 'FAILED':
      return (
        <Badge
          variant={variant}
          className={
            variant == 'default'
              ? 'bg-red-600 hover:bg-red-600 dark:bg-red-500'
              : 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
          }
        >
          Thất bại
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
          Không xác định
        </Badge>
      )
  }
}

export default RefundRequestStatusBadge
