import { SidebarInset } from '@/components/ui/sidebar'
import AppHeader from './app-header'

const AppWrapper = ({ title, routeTree, children, className }) => {
  return (
    <SidebarInset className='flex h-full flex-col gap-2'>
      <AppHeader
        title={title}
        routeTree={routeTree}
      />
      <div className={`flex-grow p-4 pt-0 ${className}`}>{children}</div>
    </SidebarInset>
  )
}

export default AppWrapper
