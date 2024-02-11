import { Button } from '@/components/ui/button'
import { ADD_TASK } from '@/const/const'
import { Plus } from 'lucide-react'

interface TaskAddButtonProps {
	enableEditing: () => void
}

const TaskAddButton = ({ enableEditing }: TaskAddButtonProps) => {
	return (
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
}

export default TaskAddButton