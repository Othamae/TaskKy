import { QueryClient } from '@tanstack/react-query'
import { ChecklistWithTasks } from '../types'

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export const fetcher = (url: string) => fetch(url).then(res => res.json())


export function revalidateQueries(cardId: string, queryClient: QueryClient) {
    queryClient.invalidateQueries({
        queryKey: ['card', cardId],
    })
    queryClient.invalidateQueries({
        queryKey: ['card-logs', cardId],
    })
    queryClient.invalidateQueries({
        queryKey: ['card-checkList', cardId],
    })
}

export function getProgress(checklist: ChecklistWithTasks): [number, string] {
    const progress = checklist.tasks.filter(task => task.completed).length / checklist.tasks.length * 100
    return [progress < 1 || isNaN(progress) ? 0.00 : progress, isNaN(progress) ? '0% ' : Math.round(progress) + '%']
}