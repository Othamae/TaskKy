'use client'
import { Popover } from '@/components/ui/popover'
import { CardWithListAndChecklist } from '@/lib/types'
import CalendarContent from '../dates/CalendarContent'
import DuedateTrigger from './DuedateTrigger'

interface DueDateProps {
    cardData?: CardWithListAndChecklist
}


const DueDate = ({ cardData }: DueDateProps) => {
    return (
        <Popover  >
            <DuedateTrigger cardData={cardData} />
            <CalendarContent duedate={cardData?.duedate} />
        </Popover>
    )
}

export default DueDate