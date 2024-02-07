import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'
import OrgInfo from '../_components/OrgInfo'
import ActivityList from './_components/ActivityList'

const ActivityPage = () => {
	return (
		<div className='w-full'>
			<OrgInfo />
			<Separator className='my-2' />
			<Suspense fallback={<ActivityList.Skeleton />}>
				<ActivityList />
			</Suspense>
		</div>
	)
}

export default ActivityPage
