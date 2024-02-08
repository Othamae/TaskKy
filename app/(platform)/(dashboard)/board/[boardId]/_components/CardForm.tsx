'use client'

import FormSubmitButton from '@/components/form/FormSubmitButton'
import FormTextarea from '@/components/form/FormTextarea'
import { Button } from '@/components/ui/button'
import { ADD_A_CARD, ADD_CARD, ENTER_A_TITTLE_PLACEHOLDER } from '@/const/const'
import { useCardForm } from '@/hooks/useCardForm'
import { Plus, X } from 'lucide-react'
import { forwardRef } from 'react'

interface CardFormProps {
	isEditing: boolean
	enableEditing: () => void
	disableEditing: () => void
	listId: string
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ isEditing, enableEditing, disableEditing, listId }, ref) => {
		const { onSubmit, onTextareaKeyDown, formRef, fieldErrors } = useCardForm(disableEditing)

		if (isEditing) {
			return (
				<form ref={formRef} action={onSubmit} className='m-1 py-0.5 px-1 space-y-4'>
					<FormTextarea
						id='title'
						onKeyDown={onTextareaKeyDown}
						ref={ref}
						placeholder={ENTER_A_TITTLE_PLACEHOLDER}
						errors={fieldErrors}
					/>
					<input name='listId' hidden id='listId' value={listId} />
					<div className='flex items-center gap-x-1'>
						<FormSubmitButton>{ADD_CARD}</FormSubmitButton>
						<Button onClick={disableEditing} size='sm' variant='ghost'>
							<X className='h-5 w-5' />
						</Button>
					</div>
				</form>
			)
		}

		return (
			<div className='pt-2 px-2'>
				<Button
					onClick={enableEditing}
					className='h-auto px-2 py-2.5 w-full justify-start text-muted-foreground text-sm'
					size='sm'
					variant='ghost'
				>
					<Plus className='w-4 h-4 mr-2'></Plus>
					{ADD_A_CARD}
				</Button>
			</div>
		)
	},
)

CardForm.displayName = 'CardForm'
export default CardForm
