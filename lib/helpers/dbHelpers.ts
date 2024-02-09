import { SELECT_ORG } from '@/const/routes'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '../db'

export async function getListsForBoardIdPage(boardId: string) {
    const { orgId } = auth()
    if (!orgId) redirect(SELECT_ORG)
    const lists = await db.list.findMany({
        where: {
            boardId,
            board: {
                orgId,
            },
        },
        include: {
            cards: {
                orderBy: {
                    order: 'asc',
                },
            },
        },
        orderBy: {
            order: 'asc',
        },
    })
    return lists
}

export async function getActivityList() {
    const { orgId } = auth()
    if (!orgId) redirect(SELECT_ORG)

    const auditLogs = await db.auditLog.findMany({
        where: { orgId },
        orderBy: { createdAt: 'desc' },
    })

    return auditLogs
}