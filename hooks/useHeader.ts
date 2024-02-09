import { updateChecklist } from '@/actions/updateChecklist'
import { updateList } from '@/actions/updateList'
import { SUCCESS_RENAMED, TYPE_CHECKLIST, TYPE_LIST } from '@/const/const'
import { useAction } from '@/hooks/useAction'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import { useEditing } from './useEditing'

interface useHeaderProps {
	defaultTitle: string,
	type: 'List' | 'Checklist'
}

export const useHeader = ({ defaultTitle, type }: useHeaderProps) => {
	const queryClient = useQueryClient()
	const [title, setTitle] = useState(defaultTitle)
	const params = useParams()
	const boarIDfromParams = params.boardId as string

	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const { disableEditing, enableEditing, isEditing } = useEditing({ refElement: inputRef, select: true })


	const { execute: executeUpdateChecklist } = useAction(updateChecklist, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['card', data.cardId],
			})
			queryClient.invalidateQueries({
				queryKey: ['card-logs', data.cardId],
			})
			queryClient.invalidateQueries({
				queryKey: ['card-checkList', data.cardId],
			})
			toast.success(`${TYPE_CHECKLIST} "${data.title}" ${SUCCESS_RENAMED}`)
			setTitle(data.title)
			disableEditing()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const { execute: executeUpdateList } = useAction(updateList, {
		onSuccess: (data) => {
			toast.success(`${TYPE_LIST} "${data.title}" ${SUCCESS_RENAMED}`)
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
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		if (title === defaultTitle) return disableEditing()

		if (type === 'Checklist') {
			const cardId = formData.get('cardId') as string
			executeUpdateChecklist({ title, cardId, id, boardId: boarIDfromParams })

		} else if (type === 'List') {
			executeUpdateList({ title, boardId, id })
		}

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
