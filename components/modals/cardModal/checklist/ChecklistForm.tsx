'use client'

import FormInput from '@/components/form/FormInput'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { ADD_CHECKLIST, ENTER_A_CHECKLIST_TITTLE_PLACEHOLDER, TYPE_CHECKLIST } from '@/const/const'
import { useChecklistForm } from '@/hooks/useChecklistForm'
import { Plus, X } from 'lucide-react'
import { forwardRef } from 'react'

interface ChecklistFormProps {
	isEditing: boolean
	enableEditing: () => void
	disableEditing: () => void
	cardId: string
}

const ChecklistForm = forwardRef<HTMLInputElement, ChecklistFormProps>(
	({ isEditing, enableEditing, disableEditing, cardId }, ref) => {
		const { onSubmit, formRef, fieldErrors } = useChecklistForm()

		return (
			isEditing
				?
				<form ref={formRef} action={onSubmit} className='m-1 py-0.5 px-1 space-y-4'>
					<FormInput
						id='title'
						ref={ref}
						placeholder={ENTER_A_CHECKLIST_TITTLE_PLACEHOLDER}
						errors={fieldErrors}
						defaultValue={TYPE_CHECKLIST}
					/>
					<input name='cardId' hidden id='cardId' value={cardId} />
					<div className='flex items-center gap-x-1'>
						<FormSubmitButton>{ADD_CHECKLIST}</FormSubmitButton>
						<Button onClick={disableEditing} size='sm' variant='ghost'>
							<X className='h-5 w-5' />
						</Button>
					</div>
				</form>
				:
				<div className='pt-2 px-2'>
					<Button
						onClick={enableEditing}
						className='h-auto px-2 py-2.5 w-full justify-start text-muted-foreground text-sm'
						size='sm'
						variant='ghost'
					>
						<Plus className='w-4 h-4 mr-2'></Plus>
						{ADD_CHECKLIST}
					</Button>
				</div>
		)
	},
)

ChecklistForm.displayName = 'ChecklistForm'
export default ChecklistForm
