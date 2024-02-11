'use client'

import FormInput from '@/components/form/FormInput'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { PopoverClose } from '@/components/ui/popover'
import { ADD_CHECKLIST, ENTER_A_CHECKLIST_TITTLE_PLACEHOLDER, TYPE_CHECKLIST } from '@/const/const'
import { useChecklistForm } from '@/hooks/useChecklistForm'
import { X } from 'lucide-react'

interface ChecklistFormProps {
	cardId: string
}

const ChecklistForm = ({ cardId }: ChecklistFormProps) => {
	const { onSubmit, formRef, fieldErrors, closeRef } = useChecklistForm()

	return (
		<form ref={formRef} action={onSubmit} className='m-1 py-0.5 px-1 space-y-4'>
			<FormInput
				id='title'
				placeholder={ENTER_A_CHECKLIST_TITTLE_PLACEHOLDER}
				errors={fieldErrors}
				defaultValue={TYPE_CHECKLIST}
			/>
			<input name='cardId' hidden id='cardId' value={cardId} />
			<div className='flex items-center gap-x-1'>
				<FormSubmitButton>{ADD_CHECKLIST}</FormSubmitButton>
				<PopoverClose asChild ref={closeRef}>
					<Button size='sm' variant='ghost'>
							<X className='h-5 w-5' />
						</Button>
				</PopoverClose>
			</div>
		</form>
		)
}


export default ChecklistForm
