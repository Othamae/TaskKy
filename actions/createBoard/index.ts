'use server'
import { db } from '@/lib/db'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth()
    if (!userId) {
        return {
            error: 'You must be logged in to create a board',
        }
    }

    const { title } = data
    let board
    try {
        board = await db.board.create({
            data: {
                title
            }
        })
    } catch (error) {
        return {
            error: 'Faile to create'
        }
    }

    revalidatePath(`/board/${board.id}`)
    return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)