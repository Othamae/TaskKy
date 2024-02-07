import { createList } from '@/actions/createList'
import { useAction } from '@/hooks/useAction'
import { useParams, useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { useEditing } from './useEditing'

export const useListForm = () => {
	const params = useParams()
	const router = useRouter()
	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const { isEditing, disableEditing, enableEditing } = useEditing({ refElement: inputRef })

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" created`)
			disableEditing()
			router.refresh()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') disableEditing()
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = formData.get('boardId') as string
		execute({ title, boardId })
	}

	return {
		onSubmit,
		enableEditing,
		params,
		isEditing,
		fieldErrors,
		disableEditing,
		inputRef,
		formRef,
	}
}
