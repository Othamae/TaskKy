import { createCard } from '@/actions/createCard'
import { useAction } from '@/hooks/useAction'
import { useParams } from 'next/navigation'
import { ElementRef, KeyboardEventHandler, useRef } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

export const useCardForm = (disableEditing: () => void) => {
	const params = useParams()
	const formRef = useRef<ElementRef<'form'>>(null)
	const { execute, fieldErrors } = useAction(createCard, {
		onSuccess: (data) => {
			toast.success(`Card "${data.title}" created`)
			formRef.current?.reset()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') disableEditing()
	}

	useOnClickOutside(formRef, disableEditing)
	useEventListener('keydown', onKeyDown)

	const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			formRef.current?.requestSubmit()
		}
	}

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const listId = formData.get('listId') as string
		const boardId = params.boardId as string
		execute({ title, listId, boardId })
	}

	return {
		onSubmit,
		onTextareaKeyDown,
		formRef,
		fieldErrors,
	}
}
