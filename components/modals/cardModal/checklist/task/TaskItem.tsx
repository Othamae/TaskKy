'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { Task } from '@prisma/client'
import TaskHeader from './TaskHeader'
import TaskOptions from './TaskOptions'

interface TaskItemProps {
    task: Task
    cardId: string
}

const TaskItem = ({ task, cardId }: TaskItemProps) => {
    return (
        <li className="ml-7 ">
            <div className='flex items-center space-x-1'>
                <Checkbox id={task.id} />
                <div className="w-full h-8 flex items-center justify-between ml-7 hover:bg-neutral-200 hover:rounded-lg peer-data-[state=checked]:line-through group">
                    <TaskHeader cardId={cardId} task={task} />
                    <div className='invisible group-hover:visible '>
                        <TaskOptions task={task} cardId={cardId} />
                    </div>
                </div>
            </div>
        </li>
    )
}

export default TaskItem