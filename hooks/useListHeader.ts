import { updateList } from '@/actions/updateList'
import { useAction } from '@/hooks/useAction'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import { useEditing } from './useEditing'

export const useListHeader = (defaultTitle: string) => {
	const [title, setTitle] = useState(defaultTitle)

	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const { disableEditing, enableEditing, isEditing } = useEditing({ refElement: inputRef, select: true })

	const { execute } = useAction(updateList, {
		onSuccess: (data) => {
			toast.success(`Renamed to "${data.title}"`)
			setTitle(data.title)
			disableEditing()
		},
		onError: (error) => {
			toast.error(error)
		},
	})
	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			formRef.current?.submit()
		}
	}

	const handleSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = formData.get('boardId') as string
		const id = formData.get('id') as string
		if (title === defaultTitle) return disableEditing()

		execute({ title, boardId, id })
	}
	const onBlur = () => {
		formRef.current?.requestSubmit()
	}

	useEventListener('keydown', onKeyDown)

	return {
		title,
		onBlur,
		handleSubmit,
		enableEditing,
		inputRef,
		isEditing,
		formRef,
	}
}
