import { QueryClient } from '@tanstack/react-query'

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