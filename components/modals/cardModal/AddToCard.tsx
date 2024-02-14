'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { CardWithListAndChecklist, ChecklistWithTasks } from '@/lib/types'
import ChecklistButton from './addToCard/ChecklistButton'
import DatesButton from './addToCard/DatesButton'

interface AddToCardProps {
    checklistData: ChecklistWithTasks[]
    cardData: CardWithListAndChecklist
}

const AddToCard = ({ checklistData, cardData }: AddToCardProps) => {

    return (
        <div className='space-y-2 mt-2'>
            <p className='text-xs font-semibold'>Add to card</p>
            <ChecklistButton cardId={cardData.id} />
            <DatesButton card={cardData} />
            {
            // TODO: labels and Attachment

            /* <Button
                variant='gray'
                className='w-full justify-start'
                size='inLine'
            >
                <Tag className='w-4 h-4 mr-2' />
                Labels
            </Button>
            <AttachmentButton />
            */}
        </div>
    )
}

AddToCard.Skeleton = function AddToCardSkeleton() {
    return (
        <div className='space-y-2 mb-2'>
            <Skeleton className='w-20 h-4 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
        </div>
    )
}

export default AddToCard