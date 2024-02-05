'use client'

import { updateBoard } from '@/actions/updateBoard'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/useAction'
import { Board } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

interface BoardTitleFormProps {
	board: Board
}

const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
	const { execute } = useAction(updateBoard, {
		onSuccess: (data) => {
			toast.success(`Board "${data.title}" updated`)
			setTitle(data.title)
			disableEditing()
		},
		onError: (error) => {
			toast.error(error)
		},
	})
	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)
	const [title, setTitle] = useState(board.title)
	const [isEditing, setIsEditing] = useState(false)
	const disableEditing = () => {
		setIsEditing(false)
	}
	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		})
	}

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		execute({
			title,
			id: board.id,
		})
	}

	const onBlur = () => {
		formRef.current?.requestSubmit()
	}

	if (isEditing) {
		return (
			<form action={onSubmit} className="flex items-center gap-x-2" ref={formRef}>
				<FormInput
					id="title"
					onBlur={onBlur}
					defaultValue={title}
					className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
					ref={inputRef}
				></FormInput>
			</form>
		)
	}
	return (
		<Button variant="transparent" className="font-bold text-lg h-auto w-auto p-1 px-2" onClick={enableEditing}>
			{title}
		</Button>
	)
}

export default BoardTitleForm
