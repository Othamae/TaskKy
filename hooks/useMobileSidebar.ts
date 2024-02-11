import { mobileSidebarStore } from '@/store/mobileSidebarStore'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'


export const useMobileSidebar = () => {
	const pathname = usePathname()
	const [isMounted, setIsMounted] = useState(false)
	const onOpen = mobileSidebarStore((state) => state.onOpen)
	const onClose = mobileSidebarStore((state) => state.onClose)
	const isOpen = mobileSidebarStore((state) => state.isOpen)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		onClose()
	}, [pathname, onClose])

	return {
		isOpen,
		onOpen,
		onClose,
		isMounted
	}
}