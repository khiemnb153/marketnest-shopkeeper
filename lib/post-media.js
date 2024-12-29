import { toast } from 'sonner'

export const postImage = async (image, accessToken) => {
  const formData = new FormData()
  formData.append('image', image)

  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/medias/upload-image', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  if (!res.ok) {
    toast.error(`Tải hình ảnh lên thất bại. Code: ${res.status}`)
    return null
  }

  return (await res.json()).data.url
}
