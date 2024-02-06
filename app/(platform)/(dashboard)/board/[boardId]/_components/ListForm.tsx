'use client'

import { createList } from '@/actions/createList'
import FormInput from '@/components/form/FormInput'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/useAction'
import { Plus, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import ListWrapper from './ListWrapper'

const ListForm = () => {
	const params = useParams()
	const router = useRouter()
	const [isEditing, setIsEditing] = useState(false)
	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

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

	if (isEditing) {
		return (
			<ListWrapper>
				<form ref={formRef} action={onSubmit} className="w-full rounded-md bg-white p-3 space-y-4 shadow-md">
					<FormInput
						ref={inputRef}
						id="title"
						className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
						placeholder="Enter list title..."
						errors={fieldErrors}
					/>
					<input hidden value={params.boardId} name="boardId" />
					<div className="flex items-center gap-x-1">
						<FormSubmitButton>Add list</FormSubmitButton>
						<Button onClick={disableEditing} size="sm" variant="ghost">
							<X className="h-4 w-5" />
						</Button>
					</div>
				</form>
			</ListWrapper>
		)
	}

	return (
		<ListWrapper>
			<button
				onClick={enableEditing}
				className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
			>
				<Plus className="w-4 h-4 mr-2" />
				Add a list
			</button>
		</ListWrapper>
	)
}

export default ListForm
