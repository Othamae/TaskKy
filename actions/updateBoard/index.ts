'use server'
import { db } from '@/lib/db'

import { ERROR_UNAUTHORIZED, ERROR_UPDATE } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { UpdateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
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
		await createAuditLog({
			entityType: ENTITY_TYPE.BOARD,
			entityId: board.id,
			entityTitle: board.title,
			action: ACTION.UPDATE
		})
	} catch (error) {
		return {
			error: ERROR_UPDATE,
		}
	}

	revalidatePath(`${BOARD}/${id}`)
	return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)
