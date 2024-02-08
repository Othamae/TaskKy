'use client'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { BOARD_OPTIONS, DELETE_BOARD } from '@/const/const'
import { useBoardOptions } from '@/hooks/useBoardOptions'
import { MoreHorizontal, X } from 'lucide-react'

interface BoardOptionsProps {
	id: string
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
	const { isLoading, onDelete } = useBoardOptions(id)
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className='h-auto w-auto p-2' variant='transparent'>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
				<div className='text-sm font-medium text-center text-neutral-600 pb-4'>{BOARD_OPTIONS}</div>
				<PopoverClose asChild>
					<Button className='h-auto w-auto p-2 absolute top-2 right-2' variant='ghost'>
						<X className='h-4 w-4' />
					</Button>
				</PopoverClose>
				<Button
					className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
					variant='ghost'
					onClick={onDelete}
					disabled={isLoading}
				>
					{DELETE_BOARD}
				</Button>
			</PopoverContent>
		</Popover>
	)
}

export default BoardOptions
