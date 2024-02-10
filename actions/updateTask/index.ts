'use server'
import { db } from '@/lib/db'

import { ERROR_UNAUTHORIZED, ERROR_UPDATE } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { UpdateTask } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { id, boardId, title, checklistId, cardId } = data

	let task
	try {
		task = await db.task.update({
			where: {
				id,
				checklist: {
					card: { list: { board: { orgId } } }
				},
				checklistId
			},
			data: {
				title,
			},
			include: { checklist: true }
		})
		await createAuditLog({
			entityId: cardId,
			entityTitle: task.title,
			entityType: ENTITY_TYPE.TASK,
			action: ACTION.UPDATE
		})
	} catch (error) {
		return {
			error: ERROR_UPDATE,
		}
	}
	revalidatePath(`${BOARD}/${boardId}`)
	return { data: task }
}

export const updateTask = createSafeAction(UpdateTask, handler)
