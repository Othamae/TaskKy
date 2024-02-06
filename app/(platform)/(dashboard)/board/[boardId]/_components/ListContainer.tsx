'use client'

import { ListWithCards } from '@/lib/types'
import { useEffect, useState } from 'react'
import ListForm from './ListForm'
import ListItem from './ListItem'

interface ListContainerProps {
	boardId: string
	list: ListWithCards[]
}

const ListContainer = ({ boardId, list }: ListContainerProps) => {
	const [orderedList, setOrderedList] = useState(list)
	useEffect(() => {
		setOrderedList(list)
	}, [list])
	return (
		<ol className='flex gap-x-3 h-full'>
			{orderedList.map((list, index) => (
				<ListItem key={list.id}
					index={index}
					list={list}
				/>
			))}
			<ListForm />
			<div className="flex-shrink-0 w-1" />
		</ol>
	)
}

export default ListContainer
