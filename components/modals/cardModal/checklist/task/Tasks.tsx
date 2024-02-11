import { ChecklistWithTasks } from '@/lib/types'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

interface TasksProps {
    checklist: ChecklistWithTasks
}

const Tasks = ({ checklist }: TasksProps) => {

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
            <TaskForm checklist={checklist} />
        </div>
    )


}

export default Tasks