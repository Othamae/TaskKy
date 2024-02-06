'use client'
import { Card } from '@prisma/client'
interface CardItemProps {
    index: number
    card: Card
}

const CardItem = ({ index, card }: CardItemProps) => {
    return (
        <div
            role='button'
            className='truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm'>
            {card.title}
        </div>
    )
}

export default CardItem