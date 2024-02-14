'use client'
import { DatePicker } from '@/components/modals/cardModal/dates/DatePicker'
import { Button } from '@/components/ui/button'
import { PopoverClose, PopoverContent } from '@/components/ui/popover'
import { ADD_DUE_DATE } from '@/const/const'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'


interface CalendarContentProps {
    inAddToCard?: boolean
    duedate?: Date | null
}

const CalendarContent = ({ inAddToCard, duedate }: CalendarContentProps) => {
    return (
        <PopoverContent
            className={cn('px-0 pt-3 pb-3 md:-mt-20', inAddToCard && 'md:-mt-44')}
            side='bottom' align='start' >
            <div className='text-sm font-medium text-center text-neutral-600 pb-4'>{ADD_DUE_DATE}</div>
            <PopoverClose asChild>
                <Button className={cn('h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600  md:-mt-20', inAddToCard && 'md:-mt-44')} variant='ghost'>
                    <X className='h-4 w-4' />
                </Button>
            </PopoverClose>
            <DatePicker duedate={duedate} />
        </PopoverContent>
    )
}

export default CalendarContent