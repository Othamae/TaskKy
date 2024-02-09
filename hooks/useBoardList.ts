import { SELECT_ORG } from '@/const/routes'
import { db } from '@/lib/db'
import { getAvailableCount } from '@/lib/helpers/orgLimit'
import { checkSubscription } from '@/lib/helpers/subscription'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export const useBoardList = async () => {
    const { orgId } = auth()

    if (!orgId) return redirect(SELECT_ORG)

    const listOfBoards = await db.board.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    const availableCount = await getAvailableCount()
    const isPro = await checkSubscription()

    return {
        availableCount,
        isPro,
        listOfBoards
    }
}