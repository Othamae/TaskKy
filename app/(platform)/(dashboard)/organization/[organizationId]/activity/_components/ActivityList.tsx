import ActivityItem from '@/components/ActivityItem'
import { Skeleton } from '@/components/ui/skeleton'
import { NO_ACTIVITY_INSIDE_ORG } from '@/const/const'
import { getActivityList } from '@/lib/helpers/dbHelpers'


const ActivityList = async () => {
    const auditLogs = await getActivityList()
    return (
        <ol className='space-y-4 mt-4'>
            <p className='hidden last:block text-center text-xs text-muted-foreground'>
                {NO_ACTIVITY_INSIDE_ORG}
            </p>
            {auditLogs.map((log) => (
                <ActivityItem key={log.id} data={log} />
            ))}
        </ol>
    )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
    return (
        <ol className='space-y-4 mt-4'>
            <Skeleton className='w-[80%] h-14' />
            <Skeleton className='w-[50%] h-14' />
            <Skeleton className='w-[70%] h-14' />
            <Skeleton className='w-[80%] h-14' />
            <Skeleton className='w-[75%] h-14' />
        </ol>
    )
}

export default ActivityList