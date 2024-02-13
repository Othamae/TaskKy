'use client'
import { DatePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ADD_DUE_DATE, TYPE_DATES } from '@/const/const'
import { CardWithListAndChecklist } from '@/lib/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Clock, X } from 'lucide-react'


interface DatesButtonProps {
    cardData?: CardWithListAndChecklist
    inAddToCard?: boolean
}


const DatesButton = ({ cardData, inAddToCard }: DatesButtonProps) => {
    const duedate = cardData?.duedate && format(cardData?.duedate, "PPP")
    return (
        <Popover  >
            <PopoverTrigger asChild>
                <Button
                    variant='gray'
                    className='w-full justify-start'
                    size='inLine'
                >
                    <Clock className='w-4 h-4 mr-2' />
                    {duedate ?? TYPE_DATES}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn('px-0 pt-3 pb-3 md:-mt-20', inAddToCard && 'md:-mt-44')}
                side='bottom' align='start' >
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>{ADD_DUE_DATE}</div>
                <PopoverClose asChild>
                    <Button className={cn('h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600  md:-mt-20', inAddToCard && 'md:-mt-44')} variant='ghost'>
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <DatePicker />
            </PopoverContent>


        </Popover>
    )
}

export default DatesButton