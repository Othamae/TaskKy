'use client'

import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Organization } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface NavItemProps {
	isActive: boolean
	isExpanded: boolean
	organization: Organization
	onExapand: (id: string) => void
}

const NavItem = ({ isActive, isExpanded, organization, onExapand }: NavItemProps) => {
	return (
		<AccordionItem value={organization.id} className="border-none">
			<AccordionTrigger
				onClick={() => onExapand(organization.id)}
				className={cn(
					'flex items-center gap-x-2 p-1.5 text-neutral-700, rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
					isActive && !isExpanded && 'bg-sky-500/10 text-sky-700',
				)}
			>
				<div className="flex items-center gap-x-2">
					<div className="w-7 h-7 relative">
						<Image fill src={organization.imageUrl} alt={organization.name} className="rounded-sm object-cover"></Image>
					</div>
					<span className="font-medio text-sm">{organization.name}</span>
				</div>
			</AccordionTrigger>
		</AccordionItem>
	)
}

export default NavItem
