'use client'
import { copyChecklist } from '@/actions/copyChecklist'
import { copyList } from '@/actions/copyList'
import { createTask } from '@/actions/createTask'
import { deleteChecklist } from '@/actions/deleteChecklist'
import { deleteList } from '@/actions/deleteList'
import { deleteTask } from '@/actions/deleteTask'
import { SUCCESS_COPY, SUCCESS_CREATED, SUCCESS_DELETED, TYPE_CHECKLIST, TYPE_LIST, TYPE_TASK } from '@/const/const'
import { useAction } from '@/hooks/useAction'
import { revalidateQueries } from '@/lib/helpers/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

interface UseOptionsProps {
	type: 'List' | 'Checklist' | 'Board' | 'Task'
}

export const useOptions = ({ type }: UseOptionsProps) => {
	const queryClient = useQueryClient()
	const closeRef = useRef<ElementRef<'button'>>(null)
	const formRef = useRef<ElementRef<'form'>>(null)

	const params = useParams()
	const boardIdFromParams = params.boardId as string
	const { execute: executeListDelete } = useAction(deleteList, {
		onSuccess: (data) => {
			toast.success(`${TYPE_LIST} "${data.title}" ${SUCCESS_DELETED}`)
			closeRef.current?.click()
		},
		onError: (error) => {
			toast.error(error)
		},
	})
	const { execute: executeListCopy } = useAction(copyList, {
		onSuccess: (data) => {
			toast.success(`${TYPE_LIST} "${data.title}" ${SUCCESS_COPY}`)
			closeRef.current?.click()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const { execute: executeChecklistDelete } = useAction(deleteChecklist, {
		onSuccess: (data) => {
			toast.success(`${TYPE_CHECKLIST} "${data.title}" ${SUCCESS_DELETED}`)
			closeRef.current?.click()
			revalidateQueries(data.cardId, queryClient)
		},
		onError: (error) => {
			toast.error(error)
		},
	})
	const { execute: executeChecklistCopy } = useAction(copyChecklist, {
		onSuccess: (data) => {
			toast.success(`${TYPE_CHECKLIST} "${data.title}" ${SUCCESS_COPY}`)
			closeRef.current?.click()
			revalidateQueries(data.cardId, queryClient)
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const { execute: executeTaskDelete } = useAction(deleteTask, {
		onSuccess: (data) => {
			toast.success(`${TYPE_TASK} "${data.title}" ${SUCCESS_DELETED}`)
			closeRef.current?.click()
			revalidateQueries(data.checklist.cardId, queryClient)
		},
		onError: (error) => {
			toast.error(error)
		},
	})
	const { execute: executeTaskCreate, fieldErrors: taskFieldErrors } = useAction(createTask, {
		onSuccess: (data) => {
			toast.success(`${TYPE_TASK} "${data.title}" ${SUCCESS_CREATED}`)
			closeRef.current?.click()
			revalidateQueries(data.checklist.cardId, queryClient)
		},
		onError: (error) => {
			toast.error(error)
		},
	})


	const handleDelete = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string
		const cardId = formData.get('cardId') as string
		const checklistId = formData.get('checklistId') as string
		if (type === 'List') executeListDelete({ id, boardId })
		if (type === 'Checklist') executeChecklistDelete({ id, boardId: boardIdFromParams, cardId })
		if (type === 'Task') executeTaskDelete({ id, boardId: boardIdFromParams, cardId, checklistId })

	}

	const handleCopy = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string
		const cardId = formData.get('cardId') as string
		if (type === 'List') executeListCopy({ id, boardId })
		if (type === 'Checklist') executeChecklistCopy({ id, boardId: boardIdFromParams, cardId })

	}

	const handleCreate = (formData: FormData) => {
		const checklistId = formData.get('checklistId') as string
		const title = formData.get('title') as string
		executeTaskCreate({ title, boardId: boardIdFromParams, checklistId })
	}
	return {
		handleDelete,
		handleCopy,
		closeRef,
		handleCreate,
		formRef,
		taskFieldErrors
	}
}