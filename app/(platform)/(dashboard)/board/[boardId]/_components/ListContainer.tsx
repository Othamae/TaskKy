'use client'

import { updateCardOrder } from '@/actions/updateCardOrder'
import { updateListOrder } from '@/actions/updateListOrder'
import { useAction } from '@/hooks/useAction'
import { ListWithCards } from '@/lib/types'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ListForm from './ListForm'
import ListItem from './ListItem'

interface ListContainerProps {
	boardId: string
	list: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const ListContainer = ({ boardId, list }: ListContainerProps) => {
	const [orderedList, setOrderedList] = useState(list)

	const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
		onSuccess: () => {
			toast.success('List reordered')
		},
		onError: (error) => {
			toast.error(error)
		}
	})

	const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
		onSuccess: () => {
			toast.success('Card reordered')
		},
		onError: (error) => {
			toast.error(error)
		}
	})
	useEffect(() => {
		setOrderedList(list)
	}, [list])

	const onDragEnd = (result: any) => {
		const { destination, source, type } = result
		if (!destination) return
		// if Dropped in the same position
		if (destination.droppableId === source.droppableId && destination.index === source.index) return

		if (type === 'list') {
			const newOrderedList = reorder(orderedList, source.index, destination.index).map((item, index) => ({ ...item, order: index }))
			setOrderedList(newOrderedList)

			executeUpdateListOrder({ items: newOrderedList, boardId })
		}

		if (type === 'card') {
			let newOrderedList = [...orderedList]
			const sourceList = newOrderedList.find(list => list.id === source.droppableId)
			const destinationList = newOrderedList.find(list => list.id === destination.droppableId)

			if (!sourceList || !destinationList) return

			if (!sourceList.cards) sourceList.cards = []

			if (!destinationList.cards) destinationList.cards = []

			// Moving card in same list
			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(sourceList.cards, source.index, destination.index)
				reorderedCards.forEach((card, index) => card.order = index)
				sourceList.cards = reorderedCards
				setOrderedList(newOrderedList)

				executeUpdateCardOrder({ items: reorderedCards, boardId })

			} else { // Moving card between lists
				const [movedCard] = sourceList.cards.splice(source.index, 1)

				// Assign destination listId to the moved card
				movedCard.listId = destination.droppableId

				// Add moved card to destination list
				destinationList.cards.splice(destination.index, 0, movedCard)

				sourceList.cards.forEach((card, index) => card.order = index)

				destinationList.cards.forEach((card, index) => card.order = index)

				setOrderedList(newOrderedList)

				executeUpdateCardOrder({ items: destinationList.cards, boardId })

			}



		}

	}
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='lists' type='list' direction='horizontal'>
				{(provided) => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className='flex gap-x-3 h-full'>
						{orderedList.map((list, index) => (
							<ListItem key={list.id}
								index={index}
								list={list}
							/>
						))}
						{provided.placeholder}
						<ListForm />
						<div className="flex-shrink-0 w-1" />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default ListContainer
