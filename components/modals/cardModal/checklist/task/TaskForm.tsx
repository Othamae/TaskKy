'use client'

import FormInput from '@/components/form/FormInput'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { ADD_TASK, ENTER_TASK_PLACEHOLDER } from '@/const/const'
import { useOptions } from '@/hooks/useOptions'
import { ChecklistWithTasks } from '@/lib/types'
import { Plus, X } from 'lucide-react'
import { forwardRef } from 'react'

interface TaskFormProps {
	isEditing: boolean
	enableEditing: () => void
	disableEditing: () => void
	checklist: ChecklistWithTasks
}

const TaskForm = forwardRef<HTMLInputElement, TaskFormProps>(
	({ isEditing, enableEditing, disableEditing, checklist }, ref) => {

		const { handleCreate, taskFieldErrors, formRef, closeRef } = useOptions({ type: 'Task' })
		return (
			isEditing
				?
				<form ref={formRef} action={handleCreate} className='m-1 py-0.5 px-1 space-y-4 ml-7'>
					<FormInput
						id='title'
						ref={ref}
						placeholder={ENTER_TASK_PLACEHOLDER}
						errors={taskFieldErrors}
					/>
					<input name='checklistId' hidden id='checklistId' value={checklist.id} />
					<input name='cardId' hidden id='cardId' value={checklist.cardId} />
					<div className='flex items-center gap-x-1'>
						<FormSubmitButton>{ADD_TASK}</FormSubmitButton>
						<Button onClick={disableEditing} size='sm' variant='ghost' ref={closeRef}>
							<X className='h-5 w-5' />
						</Button>
					</div>
				</form>
				:
				<div className='pt-2 ml-7'>
					<Button
						onClick={enableEditing}
						className='h-auto justify-start text-sm'
						size='inLine'
						variant='gray'
					>
						<Plus className='w-4 h-4 mr-1'></Plus>
						{ADD_TASK}
					</Button>
				</div>
		)
	},
)

TaskForm.displayName = 'TaskForm'
export default TaskForm
