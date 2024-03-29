'use client'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ORGANIZATION } from '@/const/routes'
import { useNavItem } from '@/hooks/useNavItem'
import { Organization } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'
import Image from 'next/image'

interface NavItemProps {
	isActive: boolean
	isExpanded: boolean
	organization: Organization
	onExapand: (id: string) => void
}

const NavItem = ({ isActive, isExpanded, organization, onExapand }: NavItemProps) => {
	const routes = [
		{
			label: 'Boards',
			icon: <Layout className='h-4 w-4 mr-2' />,
			href: `${ORGANIZATION}/${organization.id}`,
		},
		{
			label: 'Activity',
			icon: <Activity className='h-4 w-4 mr-2' />,
			href: `${ORGANIZATION}/${organization.id}/activity`,
		},
		{
			label: 'Settings',
			icon: <Settings className='h-4 w-4 mr-2' />,
			href: `${ORGANIZATION}/${organization.id}/settings`,
		},
		{
			label: 'Billing',
			icon: <CreditCard className='h-4 w-4 mr-2' />,
			href: `${ORGANIZATION}/${organization.id}/billing`,
		},
	]
	const { onClick, pathname } = useNavItem()
	return (
		<AccordionItem value={organization.id} className='border-none'>
			<AccordionTrigger
				onClick={() => onExapand(organization.id)}
				className={cn(
					'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
					isActive && !isExpanded && 'bg-sky-500/10 text-sky-700',
				)}
			>
				<div className='flex items-center gap-x-2'>
					<div className='w-7 h-7 relative'>
						<Image fill src={organization.imageUrl} alt={organization.name} className='rounded-sm object-cover'></Image>
					</div>
					<span className='font-medio text-sm'>{organization.name}</span>
				</div>
			</AccordionTrigger>
			<AccordionContent className='pt-1 text-neutral-700'>
				{routes.map((route) => (
					<Button
						key={route.href}
						size='sm'
						onClick={() => onClick(route.href)}
						className={cn(
							'w-full font-normal justify-normal pl-10 mb-1',
							pathname === route.href && 'bg-sky-500/10 text-sky-700',
						)}
						variant='ghost'
					>
						{route.icon}
						{route.label}
					</Button>
				))}
			</AccordionContent>
		</AccordionItem>
	)
}

NavItem.Skeleton = function SkeletonNavItem() {
	return (
		<div className='flex items-center gap-x-2'>
			<div className='w-10 h-10 relative shrink-0'>
				<Skeleton className='h-full w-full absolute' />
			</div>
			<Skeleton className='h-10 w-full' />
		</div>
	)
}

export default NavItem
