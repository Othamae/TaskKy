import { createChecklist } from '@/actions/createChecklist'
import { SUCCESS_CREATED, TYPE_CHECKLIST } from '@/const/const'
import { useAction } from '@/hooks/useAction'
import { revalidateQueries } from '@/lib/helpers/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'


export const useChecklistForm = () => {
	const queryClient = useQueryClient()
	const closeRef = useRef<ElementRef<'button'>>(null)

	const params = useParams()
	const formRef = useRef<ElementRef<'form'>>(null)
	const { execute, fieldErrors } = useAction(createChecklist, {
		onSuccess: (data) => {
			toast.success(`${TYPE_CHECKLIST} "${data.title}" ${SUCCESS_CREATED}`)
			formRef.current?.reset()
			closeRef.current?.click()
			revalidateQueries(data.cardId, queryClient)
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const cardId = formData.get('cardId') as string
		const boardId = params.boardId as string
		execute({ title, boardId, cardId })
	}

	return {
		onSubmit,
		formRef,
		fieldErrors,
		closeRef
	}
}
