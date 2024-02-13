'use client'
import { Button } from '@/components/ui/button'
import { PopoverTrigger } from '@/components/ui/popover'
import { TYPE_DATES } from '@/const/const'
import { Clock } from 'lucide-react'

const DatesTrigger = () => {
    return (
        <PopoverTrigger asChild>
            <Button
                variant='gray'
                className='w-full justify-start'
                size='inLine'
            >
                <Clock className='w-4 h-4 mr-2' />
                {TYPE_DATES}
            </Button>
        </PopoverTrigger>
    )
}

export default DatesTrigger