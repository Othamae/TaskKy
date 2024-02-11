'use client'

import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { CONVERT_TO_CARD, DELETE, TASK_ACTIONS } from '@/const/const'
import { useOptions } from '@/hooks/useOptions'
import { Task } from '@prisma/client'
import { MoreHorizontal, X } from 'lucide-react'

interface TaskOptionsProps {
    task: Task
    cardId: string
}
const TaskOptions = ({ task, cardId }: TaskOptionsProps) => {
    const { handleDelete, closeRef, handleCreateCard } = useOptions({ type: 'Task' })
    return (
        <Popover>
            <PopoverTrigger asChild >
                <Button className='h-auto w-auto p-1 rounded-full mr-1.5 mt-0.5' variant='ghost'>
                    <MoreHorizontal className='h-[14px] w-[14px]' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>{TASK_ACTIONS}</div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant='ghost'>
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>

                <form action={handleCreateCard}>
                    <input hidden id='id' name='id' value={task.id} />
                    <input hidden id='title' name='title' value={task.title} />
                    <input hidden id='checklistId' name='checklistId' value={task.checklistId} />
                    <FormSubmitButton
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                        variant='ghost'
                    >
                        {CONVERT_TO_CARD}...
                    </FormSubmitButton>
                </form>
                <Separator />
                <form action={handleDelete}>
                    <input hidden id='id' name='id' value={task.id} />
                    <input hidden id='checklistId' name='checklistId' value={task.checklistId} />
                    <input name='cardId' hidden id='cardId' value={cardId} />
                    <FormSubmitButton
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                        variant='ghost'
                    >
                        {DELETE}...
                    </FormSubmitButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default TaskOptions