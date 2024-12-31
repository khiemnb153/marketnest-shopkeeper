'use client'

import { useState, useEffect, useRef } from 'react'
import format from 'date-fns/format'
import { getAbbreviationName } from '@lib/utils'
import { postImage } from '@lib/post-media'
import { mutate, useSWRConfig } from 'swr'
import useFetch from '@hooks/use-fetch'
import { toast } from 'sonner'

import { Send, ImagePlus, X, Loader } from 'lucide-react'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'
import { Textarea } from '@components/ui/textarea'

const ChatDisplay = ({ chat }) => {
  const { accessToken } = useSWRConfig()

  const scrollAreaRef = useRef(null)
  const fileInputRef = useRef(null)
  const [msg2Send, setMsg2Send] = useState('')
  const [img2Send, setImg2Send] = useState()
  const [sending, setSending] = useState(false)

  const { data, error, isLoading } = useFetch(chat ? '/chats/chat-rooms/' + chat.id : null, { refreshInterval: 1000 })

  const renderMessages = () => {
    if (isLoading) {
      return <span className='animate-pulse text-center'>Đang tải...</span>
    }

    if (error) {
      return (
        <span className='text-center'>
          Something went wrong!!!
          <br />
          Code: {error.status}
        </span>
      )
    }

    return data.chatDetails.map((msg) => (
      <div
        key={msg.id}
        className={`flex flex-col ${msg.sender.id == chat.shop.owner.id ? 'items-end' : 'items-start'}`}
      >
        <Card
          className={`w-fit p-2 ${msg.sender.id == chat.shop.owner.id ? '' : 'border-primary bg-primary text-primary-foreground'}`}
        >
          {!!msg.image && (
            <Image
              priority
              src={msg.image}
              alt='msg-image'
              width={256}
              height={256}
            />
          )}
          {msg.message}
        </Card>
        <time
          className='text-xs text-muted-foreground'
          dateTime={msg.createdAt}
        >
          {format(msg.createdAt, 'HH:mm, dd/MM/yyyy')}
        </time>
      </div>
    ))
  }

  const handleSendMessage = async () => {
    setSending(true)
    const payload = {
      senderId: chat.shop.owner.id,
      chatRoomId: chat.id,
      message: msg2Send,
    }

    if (!!img2Send) {
      toast.info('Đang tải lên hình ảnh')
      const image = await postImage(img2Send, accessToken)

      if (!image) {
        setSending(false)
        return
      }

      payload.image = image
    }
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/chats/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      toast.error(`Gửi tin nhắn thất bại. Code: ${res.status}`)
      return
    }

    setMsg2Send('')
    setImg2Send(null)
    setSending(false)
    mutate('/chats/chat-rooms/' + chat.id)
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      scrollArea.scrollIntoView(false)
    }
  }, [chat, data])

  console.log(data)

  return (
    <Card className='flex flex-grow flex-col'>
      {!chat ? (
        <div className='flex h-full items-center justify-center text-center italic text-muted-foreground'>
          Chọn một cuộc trò chuyện
        </div>
      ) : (
        <>
          <CardHeader className=''>
            <CardTitle className='flex flex-row items-center gap-2'>
              <Avatar>
                <AvatarImage
                  src={chat.user.avatar}
                  alt={chat.user.username}
                />
                <AvatarFallback>{getAbbreviationName(chat.user.username || 'User')}</AvatarFallback>
              </Avatar>
              {chat.user.username}
            </CardTitle>
          </CardHeader>
          <Separator />
          <ScrollArea className='flex-grow'>
            <CardContent
              className='flex flex-col-reverse gap-3 pt-6'
              ref={scrollAreaRef}
            >
              {renderMessages()}
            </CardContent>
          </ScrollArea>
          <CardFooter className='flex flex-row items-end gap-3'>
            <Button
              size='icon'
              variant='secondary'
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus />
            </Button>
            <div className='flex flex-grow flex-col gap-2'>
              {!!img2Send && (
                <div className='flex flex-row gap-2 rounded-md bg-secondary p-2'>
                  <div className='group relative flex aspect-square flex-shrink-0 items-center'>
                    <Image
                      src={URL.createObjectURL(img2Send)}
                      alt='Image to Send'
                      width={96}
                      height={96}
                      className='rounded-md object-cover'
                      onLoad={() => {
                        URL.revokeObjectURL(img2Send)
                      }}
                    />
                    <button
                      type='button'
                      onClick={() => setImg2Send(null)}
                      className='absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                      aria-label={`Remove image`}
                    >
                      <X className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              )}
              <Textarea
                placeholder='Nhập tin nhắn'
                value={msg2Send}
                onChange={(e) => setMsg2Send(e.target.value)}
              />
            </div>
            <Button
              size={'icon'}
              onClick={handleSendMessage}
              disabled={!msg2Send & !img2Send || sending}
            >
              {sending ? <Loader className='animate-spin' /> : <Send />}
            </Button>
            <input
              type='file'
              ref={fileInputRef}
              onChange={(e) => setImg2Send(e.target.files[0])}
              accept='image/*'
              className='hidden'
            />
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default ChatDisplay
