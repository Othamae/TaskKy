'use client'

import { fetcher } from '@/lib/fetcher'
import { CardWithListAndChecklist, ChecklistWithTasks } from '@/lib/types'
import { cardModalStore } from '@/store/cardModalStore'
import { AuditLog } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
export const useCardModal = () => {
    const id = cardModalStore((state) => state.id)
    const isOpen = cardModalStore((state) => state.isOpen)
    const onClose = cardModalStore((state) => state.onClose)
    const setListId = cardModalStore((state) => state.setListId)
    const { data: cardData } = useQuery<CardWithListAndChecklist>({
        queryKey: ['card', id],
        queryFn: () => fetcher(`/api/cards/${id}`),
    })

    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ['card-logs', id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`),
    })
    const { data: checkListData } = useQuery<ChecklistWithTasks[]>({
        queryKey: ['card-checkList', id],
        queryFn: () => fetcher(`/api/cards/${id}/checklist`),
    })

    if (cardData) setListId(cardData.listId)

    return {
        id,
        isOpen,
        onClose,
        cardData,
        checkListData,
        auditLogsData
    }
}