'use client'
import { cardModalStore } from '@/store/cardModalStore'
import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@prisma/client'
import CardDuedate from './CardDuedate'

interface CardItemProps {
	index: number
	card: Card
}

const CardItem = ({ index, card }: CardItemProps) => {
	const cardModal = cardModalStore()
	return (
		<Draggable draggableId={card.id} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role='button'
					className='truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm flex justify-between items-center'
				>
					<p className='w-full' onClick={() => cardModal.onOpen(card.id)}>{card.title}</p>
					<CardDuedate card={card} />
				</div>

			)}
		</Draggable>
	)
}

export default CardItem
