'use client'

import { UseListContainer } from '@/hooks/useListContainer'
import { ListWithCards } from '@/lib/types'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import ListForm from './ListForm'
import ListItem from './ListItem'

interface ListContainerProps {
	boardId: string
	list: ListWithCards[]
}

const ListContainer = ({ boardId, list }: ListContainerProps) => {
	const { onDragEnd, orderedList } = UseListContainer({ boardId, list })
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='lists' type='list' direction='horizontal'>
				{(provided) => (
					<ol {...provided.droppableProps} ref={provided.innerRef} className='flex gap-x-3 h-full'>
						{orderedList.map((list, index) => (
							<ListItem key={list.id} index={index} list={list} />
						))}
						{provided.placeholder}
						<ListForm />
						<div className='flex-shrink-0 w-1' />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default ListContainer
