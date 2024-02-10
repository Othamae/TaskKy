import { useEditing } from '@/hooks/useEditing'
import { ChecklistWithTasks } from '@/lib/types'
import { ElementRef, useRef } from 'react'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

interface TasksProps {
    checklist: ChecklistWithTasks
}

const Tasks = ({ checklist }: TasksProps) => {
    const inputRef = useRef<ElementRef<'input'>>(null)
    const { enableEditing,
        isEditing,
        disableEditing, } = useEditing({ refElement: inputRef })
    return (
        <div>
            {checklist.tasks &&
                <ol className='w-full'>
                    {
                        checklist.tasks.map(task => (
                            <TaskItem task={task} key={task.id} cardId={checklist.cardId} />

                        ))
                    }
                </ol>
            }
            <TaskForm isEditing={isEditing} enableEditing={enableEditing} disableEditing={disableEditing} checklist={checklist} />
        </div>
    )


}

export default Tasks