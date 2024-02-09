'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { FREE, PRO } from '@/const/const'
import { useOrganization } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import Image from 'next/image'

interface OrgInfoProps {
	isPro: boolean
}

const OrgInfo = ({ isPro }: OrgInfoProps) => {
	const { organization, isLoaded } = useOrganization()
	if (!isLoaded) return <OrgInfo.Skeleton />
	return (
		<div className='flex items-center gap-x-4'>
			<div className='w-[60px] h-[60px] relative'>
				<Image fill src={organization?.imageUrl!} alt={organization?.name!} className='rounded-md object-cover' />
			</div>
			<div className='space-y-1'>
				<p className='font-semibold text-xl'>{organization?.name}</p>
				<div className='flex items-center text-xs text-muted-foreground'>
					<CreditCard className='h-3 w-3 mr-1' />
					{isPro ? PRO : FREE}
				</div>
			</div>
		</div>
	)
}

OrgInfo.Skeleton = function SkeletonOrgInfo() {
	return (
		<div className='flex items-center gap-x-4'>
			<div className='w-[60px] h-[60px] relative'>
				<Skeleton className='w-full h-full absolute' />
			</div>
			<div className='space-y-2'>
				<Skeleton className='w-[200px] h-10' />
				<div className='flex items-center text-xs text-muted-foreground'>
					<Skeleton className='h-4 w-4 mr-2' />
					<Skeleton className='h-4 w-[100px]' />
				</div>
			</div>
		</div>
	)
}

export default OrgInfo
