'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/useMobileSidebar'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

const MobileSidebar = () => {
	const { isMounted, isOpen, onClose, onOpen } = useMobileSidebar()
	if (!isMounted) return null
	return (
		<>
			<Button onClick={onOpen} className='block md:hidden mr-2' variant='ghost' size='sm'>
				<Menu className='h-4 w-4' />
			</Button>
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side='left' className='p-2 pt-10'>
					<Sidebar storageKey='t-sidebar-mobile-state' />
				</SheetContent>
			</Sheet>
		</>
	)
}

export default MobileSidebar
