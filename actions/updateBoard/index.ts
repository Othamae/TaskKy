'use server'
import { db } from '@/lib/db'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { UpdateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title, id } = data

	let board
	try {
		board = await db.board.update({
			where: {
				id,
				orgId,
			},
			data: {
				title,
			},
		})
	} catch (error) {
		return {
			error: 'Faile to update',
		}
	}

	revalidatePath(`/board/${id}`)
	return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)
