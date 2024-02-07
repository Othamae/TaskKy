'use client'

import FormInput from '@/components/form/FormInput'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { useListForm } from '@/hooks/useListForm'
import { Plus, X } from 'lucide-react'
import ListWrapper from './ListWrapper'

const ListForm = () => {
	const { disableEditing, isEditing, inputRef, formRef, onSubmit, fieldErrors, params, enableEditing } = useListForm()

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
