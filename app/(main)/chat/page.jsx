'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

import AppWrapper from '@components/app-wrapper'
import ChatList from './chat-list'
import ChatDisplay from './chat-display'

const ChatPage = () => {
  const [currentChat, setCurrentChat] = useState()

  console.log(currentChat)

  return (
    <AppWrapper
      title='Trò chuyện với khách hàng'
      className='flex h-[680px] flex-row gap-4'
    >
      <ChatList
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <ChatDisplay chat={currentChat} />
    </AppWrapper>
  )
}

export default ChatPage
