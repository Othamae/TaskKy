'use server'
import { db } from '@/lib/db'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSafeAction } from '../createSafeAction'
import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        }
    }

    const { id } = data

    let board
    try {
        board = await db.board.delete({
            where: {
                id,
                orgId
            }
        })
    } catch (error) {
        return {
            error: 'Faile to delete'
        }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)