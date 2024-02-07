'use client'

import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { useBoardTitleForm } from '@/hooks/useBoardTitleForm'
import { Board } from '@prisma/client'

interface BoardTitleFormProps {
	board: Board
}

const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
	const { isEditing, onSubmit, enableEditing, onBlur, title, inputRef, formRef } = useBoardTitleForm(board)

	if (isEditing) {
		return (
			<form action={onSubmit} className='flex items-center gap-x-2' ref={formRef}>
				<FormInput
					id='title'
					onBlur={onBlur}
					defaultValue={title}
					className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
					ref={inputRef}
				></FormInput>
			</form>
		)
	}
	return (
		<Button variant='transparent' className='font-bold text-lg h-auto w-auto p-1 px-2' onClick={enableEditing}>
			{title}
		</Button>
	)
}

export default BoardTitleForm
