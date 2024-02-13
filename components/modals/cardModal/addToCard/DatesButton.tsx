'use client'
import { Popover } from '@/components/ui/popover'
import CalendarContent from '../dates/CalendarContent'
import DatesTrigger from '../dates/DatesTrigger'


const DatesButton = () => {
    return (
        <Popover  >
            <DatesTrigger />
            <CalendarContent inAddToCard />
        </Popover>
    )
}

export default DatesButton