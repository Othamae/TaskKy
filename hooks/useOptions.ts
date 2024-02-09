'use client'
import { copyChecklist } from '@/actions/copyChecklist'
import { copyList } from '@/actions/copyList'
import { deleteChecklist } from '@/actions/deleteChecklist'
import { deleteList } from '@/actions/deleteList'
import { SUCCESS_COPY, SUCCESS_DELETED, TYPE_CHECKLIST, TYPE_LIST } from '@/const/const'
import { useAction } from '@/hooks/useAction'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

interface UseOptionsProps {
	type: 'List' | 'Checklist' | 'Board'
}

export const useOptions = ({ type }: UseOptionsProps) => {
	const queryClient = useQueryClient()
	const closeRef = useRef<ElementRef<'button'>>(null)
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
			queryClient.invalidateQueries({
				queryKey: ['card', data.cardId],
			})
			queryClient.invalidateQueries({
				queryKey: ['card-logs', data.cardId],
			})
			queryClient.invalidateQueries({
				queryKey: ['card-checkList', data.cardId],
			})
		},
		onError: (error) => {
			toast.error(error)
		},
	})
	const { execute: executeChecklistCopy } = useAction(copyChecklist, {
		onSuccess: (data) => {
			toast.success(`${TYPE_CHECKLIST} "${data.title}" ${SUCCESS_COPY}`)
			closeRef.current?.click()
			queryClient.invalidateQueries({
				queryKey: ['card', data.cardId],
			})
			queryClient.invalidateQueries({
				queryKey: ['card-logs', data.cardId],
			})
			queryClient.invalidateQueries({
				queryKey: ['card-checkList', data.cardId],
			})
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const handleDelete = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string
		const cardId = formData.get('cardId') as string
		if (type === 'List') executeListDelete({ id, boardId })
		if (type === 'Checklist') executeChecklistDelete({ id, boardId: boardIdFromParams, cardId })

	}

	const handleCopy = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string
		const cardId = formData.get('cardId') as string
		if (type === 'List') executeListCopy({ id, boardId })
		if (type === 'Checklist') executeChecklistCopy({ id, boardId: boardIdFromParams, cardId })

	}

	return {
		handleDelete,
		handleCopy,
		closeRef,
	}
}