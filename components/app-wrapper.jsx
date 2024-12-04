import { SidebarInset } from '@components/ui/sidebar'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import AppHeader from './app-header'

const AppWrapper = ({ title, routeTree, children, className }) => {
  return (
    <ScrollArea className='h-full w-full'>
      <ScrollBar className='z-20' />
      <SidebarInset className='flex h-[840px] w-full flex-col gap-2'>
        <AppHeader
          title={title}
          routeTree={routeTree}
        />
        <div className={`flex-grow p-4 pt-0 ${className}`}>{children}</div>
      </SidebarInset>
    </ScrollArea>
  )
}

export default AppWrapper
