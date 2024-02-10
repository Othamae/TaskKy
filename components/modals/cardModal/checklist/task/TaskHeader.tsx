import FormInput from '@/components/form/FormInput'
import { ENTER_TASK_PLACEHOLDER } from '@/const/const'
import { useHeader } from '@/hooks/useHeader'
import { Task } from '@prisma/client'

interface TaskHeaderProps {
    task: Task
    cardId: string
}
const TaskHeader = ({ task, cardId }: TaskHeaderProps) => {
    const { title, onBlur, handleSubmit, enableEditing, inputRef, isEditing, formRef } = useHeader({ defaultTitle: task.title, type: 'Task' })

    return (
        isEditing ? (
            <form action={handleSubmit} ref={formRef} className='flex-1 px-[2px]'>
                <input hidden id='id' name='id' value={task.id} />
                <input hidden id='cardId' name='cardId' value={cardId} />
                <input hidden id='checklistId' name='checklistId' value={task.checklistId} />
                <FormInput
                    ref={inputRef}
                    id='title'
                    onBlur={onBlur}
                    placeholder={ENTER_TASK_PLACEHOLDER}
                    defaultValue={title}
                    className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
                />
                <button hidden type='submit' />
            </form>
        ) : (
            <label onClick={enableEditing} htmlFor={task.id}
                className="pl-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
            >
                {title}
            </label>
        )
    )
}

export default TaskHeader