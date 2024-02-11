'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CardWithListAndChecklist, ChecklistWithTasks } from '@/lib/types'
import { Clock, Paperclip, Tag } from 'lucide-react'
import { useParams } from 'next/navigation'
import ChecklistButton from './addToCard/ChecklistButton'

interface AddToCardProps {
    checklistData: ChecklistWithTasks[]
    cardData: CardWithListAndChecklist
}

const AddToCard = ({ checklistData, cardData }: AddToCardProps) => {
    const params = useParams()

    return (
        <div className='space-y-2 mt-2'>
            <p className='text-xs font-semibold'>Add to card</p>
            <ChecklistButton cardId={cardData.id} />
            <Button
                variant='gray'
                className='w-full justify-start'
                size='inLine'
            // onClick={handleDeleteCard}
            // disabled={isLoadingDelete}
            >
                <Clock className='w-4 h-4 mr-2' />
                Dates
            </Button>
            <Button
                variant='gray'
                className='w-full justify-start'
                size='inLine'
            // onClick={handleDeleteCard}
            // disabled={isLoadingDelete}
            >
                <Tag className='w-4 h-4 mr-2' />
                Labels
            </Button>
            <Button
                variant='gray'
                className='w-full justify-start'
                size='inLine'
            // onClick={handleDeleteCard}
            // disabled={isLoadingDelete}
            >
                <Paperclip className='w-4 h-4 mr-2' />
                Attachment
            </Button>
        </div>
    )
}

AddToCard.Skeleton = function AddToCardSkeleton() {
    return (
        <div className=''>
            <Skeleton className='w-20 h-4 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
        </div>
    )
}

export default AddToCard