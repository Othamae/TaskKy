import { Separator } from '@/components/ui/separator'
import { checkSubscription } from '@/lib/helpers/subscription'
import { Suspense } from 'react'
import OrgInfo from '../_components/OrgInfo'
import ActivityList from './_components/ActivityList'

const ActivityPage = async () => {
	const isPro = await checkSubscription()
	return (
		<div className='w-full'>
			<OrgInfo isPro={isPro} />
			<Separator className='my-2' />
			<Suspense fallback={<ActivityList.Skeleton />}>
				<ActivityList />
			</Suspense>
		</div>
	)
}

export default ActivityPage
