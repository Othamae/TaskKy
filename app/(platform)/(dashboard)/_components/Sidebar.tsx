'use client'
import { Accordion } from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { WORKSPACES } from '@/const/const'
import { SELECT_ORG } from '@/const/routes'
import { useSidebar } from '@/hooks/useSidebar'
import { Organization } from '@/lib/types'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import NavItem from './NavItem'

interface SidebarProps {
	storageKey?: string
}

const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
	const { onExapand, isLoadedOrg, isLoadedOrgList, userMemberships, defaultAccordionValue,
		expanded, activeOrganization } = useSidebar({ storageKey })

		return (
			!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading ?
			<>
				<div className='flex items-center justify-between mb-2'>
					<Skeleton className='h-10 w-[50%]' />
					<Skeleton className='h-10 w-10' />
				</div>
				<div className='space-y-2'>
					<NavItem.Skeleton />
					<NavItem.Skeleton />
					<NavItem.Skeleton />
				</div>
			</>
				:
				<>
					<div className='font-medium text-xs flex items-center mb-1'>
						<span className='pl-4'>{WORKSPACES}</span>
						<Link
							href={SELECT_ORG}
							className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-auto'
						>
							<Plus className='h-4 w-4' />
						</Link>
					</div>
					<Accordion type='multiple' defaultValue={defaultAccordionValue} className='space-y-2'>
						{userMemberships?.data?.map(({ organization }) => (
							<NavItem
								key={organization.id}
								isActive={organization.id === activeOrganization?.id}
								isExpanded={expanded[organization.id]}
								organization={organization as Organization}
								onExapand={onExapand}
							/>
						))}
					</Accordion>
				</>
	)
}



export default Sidebar
