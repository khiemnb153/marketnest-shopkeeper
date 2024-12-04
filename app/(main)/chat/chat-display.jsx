'use client'

import { useState, useEffect, useRef } from 'react'
import format from 'date-fns/format'

import { Send } from 'lucide-react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { Search, MessageCircle } from 'lucide-react'
import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'
import { Textarea } from '@components/ui/textarea'

const conversation = [
  { id: 8, time: '2024-12-02T09:06:30Z', senderId: 'user2', text: 'Không có gì. Chúc bạn làm việc tốt!' },
  { id: 7, time: '2024-12-02T09:05:00Z', senderId: 'user1', text: 'Ok, vậy để mình chuẩn bị nhé. Cảm ơn bạn!' },
  { id: 6, time: '2024-12-02T09:04:15Z', senderId: 'user2', text: 'Mình nghĩ chúng ta có thể bắt đầu sớm nếu cần.' },
  { id: 5, time: '2024-12-02T09:03:45Z', senderId: 'user2', text: 'Rồi, mình có xem qua rồi. Mọi thứ trông ổn đó!' },
  { id: 4, time: '2024-12-02T09:02:30Z', senderId: 'user1', text: 'À, bạn đã xem email mình gửi hôm qua chưa?' },
  { id: 3, time: '2024-12-02T09:02:00Z', senderId: 'user1', text: 'Mình cũng ổn. Hôm nay có nhiều việc phải làm.' },
  { id: 2, time: '2024-12-02T09:01:15Z', senderId: 'user2', text: 'Chào buổi sáng! Mình ổn, cảm ơn. Còn bạn thì sao?' },
  { id: 1, time: '2024-12-02T09:00:00Z', senderId: 'user1', text: 'Chào bạn, dạo này thế nào rồi?' },
  { id: 18, time: '2024-12-02T09:06:30Z', senderId: 'user2', text: 'Không có gì. Chúc bạn làm việc tốt!' },
  { id: 17, time: '2024-12-02T09:05:00Z', senderId: 'user1', text: 'Ok, vậy để mình chuẩn bị nhé. Cảm ơn bạn!' },
  { id: 16, time: '2024-12-02T09:04:15Z', senderId: 'user2', text: 'Mình nghĩ chúng ta có thể bắt đầu sớm nếu cần.' },
  { id: 15, time: '2024-12-02T09:03:45Z', senderId: 'user2', text: 'Rồi, mình có xem qua rồi. Mọi thứ trông ổn đó!' },
  { id: 14, time: '2024-12-02T09:02:30Z', senderId: 'user1', text: 'À, bạn đã xem email mình gửi hôm qua chưa?' },
  { id: 13, time: '2024-12-02T09:02:00Z', senderId: 'user1', text: 'Mình cũng ổn. Hôm nay có nhiều việc phải làm.' },
  { id: 12, time: '2024-12-02T09:01:15Z', senderId: 'user2', text: 'Chào buổi sáng! Mình ổn, cảm ơn. Còn bạn thì sao?' },
  { id: 11, time: '2024-12-02T09:00:00Z', senderId: 'user1', text: 'Chào bạn, dạo này thế nào rồi?' },
]

const currentUser = 'user2'

const ChatDisplay = ({ chatId }) => {
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      scrollArea.scrollIntoView(false)
      console.log(scrollArea)
    }
  }, [chatId])
  return (
    <Card className='flex flex-grow flex-col'>
      {!chatId ? (
        <div className='flex h-full items-center justify-center text-center italic text-muted-foreground'>
          Chọn một cuộc trò chuyện
        </div>
      ) : (
        <>
          <CardHeader className=''>
            <CardTitle className='flex flex-row items-center gap-2'>
              <Avatar>
                <AvatarImage
                  src={'none'}
                  alt={'none'}
                />
                <AvatarFallback>NK</AvatarFallback>
              </Avatar>
              Nguyễn Bính Khiêm
            </CardTitle>
          </CardHeader>
          <Separator />
          <ScrollArea>
            <CardContent
              className='flex flex-grow flex-col-reverse gap-3 pt-6'
              ref={scrollAreaRef}
            >
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.senderId == currentUser ? 'items-end' : 'items-start'}`}
                >
                  <Card
                    className={`w-fit p-2 ${msg.senderId == currentUser ? '' : 'border-primary bg-primary text-primary-foreground'}`}
                  >
                    {msg.text}
                  </Card>
                  <time
                    className='text-xs text-muted-foreground'
                    dateTime={msg.time}
                  >
                    {format(msg.time, 'HH:mm, dd/MM/yyyy')}
                  </time>
                </div>
              ))}
            </CardContent>
          </ScrollArea>
          <CardFooter className='flex flex-row items-end gap-3'>
            <Textarea placeholder='Nhập tin nhắn' />
            <Button size={'icon'}>
              <Send />
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default ChatDisplay
