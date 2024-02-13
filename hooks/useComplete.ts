import { updateTask } from '@/actions/updateTask'
import { SUCCESS_COMPLETED, SUCCESS_NOT_COMPLETED, TYPE_TASK } from '@/const/const'
import { useAction } from '@/hooks/useAction'
import { revalidateQueries } from '@/lib/helpers/helpers'
import { cardModalStore } from '@/store/cardModalStore'
import { Task } from '@prisma/client'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'


export const useComplete = (task: Task) => {
    const [isCompleted, setIsCompleted] = useState(task.completed)
    let uncompleted = false
    const { id } = cardModalStore()
    const queryClient = useQueryClient()
    const params = useParams()
    const boarIDfromParams = params.boardId as string
    const cardId = id as string

    const { execute: executeUpdateTask } = useAction(updateTask, {
        onSuccess: (data) => {
            revalidateQueries(cardId, queryClient)
            toast.success(`${TYPE_TASK} "${data.title}" ${uncompleted ? SUCCESS_NOT_COMPLETED : SUCCESS_COMPLETED}`)
            setIsCompleted(data.completed ?? false)
        },
        onError: (error) => {
            toast.error(error)
        },
    })
    const onCheckedChange = (event: CheckedState) => {
        const value = event.valueOf() as boolean
        setIsCompleted(value)
        uncompleted = !value
        executeUpdateTask({
            boardId: boarIDfromParams, id: task.id, completed: value,
            checklistId: task.checklistId,
            cardId: cardId
        })

    }
    return {
        onCheckedChange
    }
}