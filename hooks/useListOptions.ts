'use client'
import { copyList } from '@/actions/copyList'
import { deleteList } from '@/actions/deleteList'
import { useAction } from '@/hooks/useAction'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

export const UseListOptions = () => {
	const closeRef = useRef<ElementRef<'button'>>(null)
	const { execute: executeDelete } = useAction(deleteList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" deleted successfully`)
			closeRef.current?.click()
		},
		onError: (error) => {
			toast.error(error)
		},
	})
	const { execute: executeCopy } = useAction(copyList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" copied`)
			closeRef.current?.click()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const handleDelete = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string
		executeDelete({ id, boardId })
	}

	const handleCopy = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string
		executeCopy({ id, boardId })
	}

	return {
		handleDelete,
		handleCopy,
		closeRef,
	}
}