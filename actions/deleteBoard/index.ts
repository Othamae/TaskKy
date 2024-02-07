'use server'
import { db } from '@/lib/db'

import { createAuditLog } from '@/lib/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
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
				orgId,
			},
		})
		await createAuditLog({
			entityType: ENTITY_TYPE.BOARD,
			entityId: board.id,
			entityTitle: board.title,
			action: ACTION.DELETE
		})
	} catch (error) {
		return {
			error: 'Faile to delete',
		}
	}

	revalidatePath(`/organization/${orgId}`)
	redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
