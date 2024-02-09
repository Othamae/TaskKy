'use client'

import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { ADD_CARD, COPY_LIST, DELETE_THIS_LIST } from '@/const/const'
import { useOptions } from '@/hooks/useOptions'
import { List } from '@prisma/client'
import { MoreHorizontal, X } from 'lucide-react'

interface ListOptionsProps {
	list: List
	onAddCard: () => void
}

const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
	const { handleCopy, handleDelete, closeRef } = useOptions({ type: 'List' })

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className='h-auto w-auto p-2' variant='ghost'>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
				<div className='text-sm font-medium text-center text-neutral-600 pb-4'>List Actions</div>
				<PopoverClose asChild ref={closeRef}>
					<Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant='ghost'>
						<X className='h-4 w-4' />
					</Button>
				</PopoverClose>
				<Button
					onClick={onAddCard}
					className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
					variant='ghost'
				>
					{ADD_CARD}...
				</Button>
				<form action={handleCopy}>
					<input hidden id='id' name='id' value={list.id} />
					<input hidden id='boardId' name='boardId' value={list.boardId} />
					<FormSubmitButton
						className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
						variant='ghost'
					>
						{COPY_LIST}...
					</FormSubmitButton>
				</form>
				<Separator />
				<form action={handleDelete}>
					<input hidden id='id' name='id' value={list.id} />
					<input hidden id='boardId' name='boardId' value={list.boardId} />
					<FormSubmitButton
						className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
						variant='ghost'
					>
						{DELETE_THIS_LIST}...
					</FormSubmitButton>
				</form>
			</PopoverContent>
		</Popover>
	)
}

export default ListOptions
