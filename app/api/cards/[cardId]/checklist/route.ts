import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(request: Request,
    { params }: { params: { cardId: string } }
) {
    try {
        const { userId, orgId } = auth()
        if (!userId || !orgId) return new NextResponse('Unauthorized', { status: 401 })

        const checkLists = await db.checklist.findMany({
            where: {
                cardId: params.cardId
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(checkLists)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}