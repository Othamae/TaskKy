'use client'
import { Popover } from '@/components/ui/popover'
import { CardWithListAndChecklist } from '@/lib/types'
import CalendarContent from '../dates/CalendarContent'
import DatesTrigger from '../dates/DatesTrigger'

interface DatesButtonProps {
    card: CardWithListAndChecklist
}
const DatesButton = ({ card }: DatesButtonProps) => {
    return (
        <Popover  >
            <DatesTrigger />
            <CalendarContent inAddToCard duedate={card.duedate} />
        </Popover>
    )
}

export default DatesButton