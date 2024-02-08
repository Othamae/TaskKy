import { deleteBoard } from '@/actions/deleteBoard'
import { toast } from 'sonner'
import { useAction } from './useAction'

export const useBoardOptions = (id: string) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => toast.error(error),
    })

    const onDelete = () => {
        execute({ id })
    }

    return {
        onDelete,
        isLoading
    }
}