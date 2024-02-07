import { updateCardOrder } from '@/actions/updateCardOrder'
import { updateListOrder } from '@/actions/updateListOrder'
import { reorder } from '@/lib/helpers'
import { ListWithCards } from '@/lib/types'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAction } from './useAction'

export const UseListContainer = ({ boardId, list }: {
    boardId: string
    list: ListWithCards[]
}) => {

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
    return {
        onDragEnd,
        orderedList
    }
}