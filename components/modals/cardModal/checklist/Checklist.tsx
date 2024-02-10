'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { CardWithListAndChecklist, ChecklistWithTasks } from '@/lib/types'
import ChecklistItem from './ChecklistItem'

interface ChecklistProps {
    items: ChecklistWithTasks[]
    cardData: CardWithListAndChecklist
}

const Checklist = ({ items, cardData }: ChecklistProps) => {
    return (
        <div className='flex items-start gap-x-3 w-full'>
            <ol className='space-y-2 w-full'>                {
                items.map((item) => (
                    <ChecklistItem key={item.id} item={item} />
                ))
            }
            </ol>
        </div>
    )
}


Checklist.Skeleton = function ChecklistSkeleton() {
    return (
        <div className='flex items-start gap-x-3 w-full'>
            <Skeleton className='h-6 w-6 bg-neutral-200' />
            <div className='w-full'>
                <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
                <Skeleton className='h-10 w-full bg-neutral-200' />
            </div>
        </div>
    )

}
export default Checklist