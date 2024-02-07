import { updateBoard } from '@/actions/updateBoard'
import { useAction } from '@/hooks/useAction'
import { Board } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

export const useBoardTitleForm = (board: Board) => {
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

	return {
		onBlur,
		onSubmit,
		enableEditing,
		title,
		isEditing,
		inputRef,
		formRef,
	}
}
