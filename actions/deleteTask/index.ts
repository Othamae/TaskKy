'use server'
import { db } from '@/lib/db'

import { ERROR_DELETE, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { DeleteTask } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { id, boardId, cardId, checklistId } = data

	let task
	try {
		task = await db.task.delete({
			where: {
				id,
				checklistId,
				checklist: {
					card: {
						list: { board: { orgId } },
					},
					cardId
				},
			},
			include: { checklist: true }
		})
		await createAuditLog({
			entityId: cardId,
			entityTitle: task.title,
			entityType: ENTITY_TYPE.TASK,
			action: ACTION.DELETE
		})
	} catch (error) {
		return {
			error: ERROR_DELETE,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: task }
}

export const deleteTask = createSafeAction(DeleteTask, handler)
