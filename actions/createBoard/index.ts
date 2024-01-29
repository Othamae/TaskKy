'use server'
import { db } from '@/lib/db'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return {
            error: 'You must be logged in to create a board',
        }
    }

    const { title, image } = data
    const [
        imageId,
        imageThumUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split('|')


    if (!imageId || !imageThumUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: 'Missing fields. Failed to create board.'
        }
    }

    let board
    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName,
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