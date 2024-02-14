'use client'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useDueDate } from '@/hooks/useDueDate'
import { Card } from '@prisma/client'
import { format } from 'date-fns'
import { Check, Clock } from 'lucide-react'
interface CarDuedateProps {
    card: Card
}

const CardDuedate = ({ card }: CarDuedateProps) => {
    const { handleComplete } = useDueDate()
    return (

        card.duedate && <Badge className='h-5 items-center flex group' variant={card.completed ? 'green' : 'yellow'} onClick={() => handleComplete(card)}>
            <Clock className='w-3 h-3 mr-1 group-hover:hidden' />
            {
                card.completed ?
                    <Check className='w-3 h-3 mr-1 group-hover:block hidden border border-green-700 bg-green-700 text-white rounded-sm' />
                    :
                    <Checkbox className='w-3 h-3 data-[state=checked]:bg-green-700 mr-1 group-hover:block hidden' checked={card.completed || false} />

            }
            <p className='pt-0.5'>{format(card.duedate, "do MMM")}</p>
        </Badge>
    )

}

export default CardDuedate