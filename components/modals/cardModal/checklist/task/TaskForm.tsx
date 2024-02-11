'use client'

import FormInput from '@/components/form/FormInput'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { ADD_TASK, ENTER_TASK_PLACEHOLDER } from '@/const/const'
import { useEditing } from '@/hooks/useEditing'
import { useOptions } from '@/hooks/useOptions'
import { ChecklistWithTasks } from '@/lib/types'
import { X } from 'lucide-react'
import { ElementRef, forwardRef, useRef } from 'react'
import TaskAddButton from './TaskAddButton'

interface TaskFormProps {
	checklist: ChecklistWithTasks
}

const TaskForm = forwardRef<HTMLInputElement, TaskFormProps>(	
	({ checklist }, ref) => {
		const inputRef = useRef<ElementRef<'input'>>(null)
		const { disableEditing, enableEditing, isEditing } = useEditing({ refElement: inputRef })
		const { closeRef, handleCreate, formRef, taskFieldErrors } = useOptions({ type: 'Task' })
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
				<TaskAddButton enableEditing={enableEditing} />
		)
	},
)

TaskForm.displayName = 'TaskForm'
export default TaskForm
