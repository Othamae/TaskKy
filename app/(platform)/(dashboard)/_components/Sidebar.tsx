'use client'
import { Accordion } from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { Organization } from '@/lib/types'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useLocalStorage } from 'usehooks-ts'
import NavItem from './NavItem'

interface SidebarProps {
	storageKey?: string
}

const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
	const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})
	const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization()

	const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	})

	const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
		if (expanded[key]) {
			acc.push(key)
		}
		return acc
	}, [])

	const onExapand = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !expanded[id],
		}))
	}

	if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
		return (
			<>
				<Skeleton></Skeleton>
			</>
		)
	}

	return (
		<>
			<div className="font-medium text-xs flex items-center mb-1">
				<span className="pl-4">Workspaces</span>
				<Link
					href="/select-org"
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-auto"
				>
					<Plus className="h-4 w-4" />
				</Link>
			</div>
			<Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
				{userMemberships.data.map(({ organization }) => (
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
