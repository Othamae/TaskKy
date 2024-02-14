'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { PopoverTrigger } from '@/components/ui/popover'
import { useDueDate } from '@/hooks/useDueDate'
import { CardWithListAndChecklist } from '@/lib/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface DuedateTriggerProps {
    cardData?: CardWithListAndChecklist
}

const DuedateTrigger = ({ cardData }: DuedateTriggerProps) => {
    const duedate = cardData?.duedate && format(cardData?.duedate, "PPP")
    const { onCheckedChange } = useDueDate()
    const isCompleted = cardData?.completed as boolean
    return (
        duedate &&
        <div className={cn('w-full justify-start flex h-6 items-center bg-yellow-200 text-secondary-foreground hover:bg-yellow-300 rounded-full group peer',
            isCompleted && 'bg-green-200 hover:bg-green-300')}>
                <Checkbox id={cardData.id} className='ml-2  data-[state=checked]:bg-green-700 ' onCheckedChange={onCheckedChange} defaultChecked={isCompleted} />
            <PopoverTrigger className='w-full flex items-start peer-data-[state=checked]:line-through '>
                <Button
                    variant='empty'
                    className='w-full justify-start flex gap-x-2 '
                    size='inLine'
                >
                    {duedate}
                </Button>
            </PopoverTrigger>
        </div>
    )
}

export default DuedateTrigger