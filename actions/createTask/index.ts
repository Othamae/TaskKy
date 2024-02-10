'use server'
import { db } from '@/lib/db'

import { TYPE_CHECKLIST } from '@/const/const'
import { ERROR_CREATE, ERROR_NOTFOUND, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CreateTask } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { title, checklistId, boardId } = data

	let task
	try {
		const checklist = await db.checklist.findUnique({
			where: {
				id: checklistId,
				card: { list: { board: { orgId } } }
			},
		})
		if (!checklist) return { error: `${TYPE_CHECKLIST} ${ERROR_NOTFOUND}` }

		const lastTask = await db.task.findFirst({
			where: { checklistId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastTask ? lastTask?.order + 1 : 1

		task = await db.task.create({
			data: {
				title,
				checklistId,
				order: newOrder,
			},
			include: { checklist: true },
		})

		await createAuditLog({
			entityId: checklist.cardId,
			entityTitle: task.title,
			entityType: ENTITY_TYPE.TASK,
			action: ACTION.CREATE
		})
	} catch (error) {
		return {
			error: ERROR_CREATE,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: task }
}

export const createTask = createSafeAction(CreateTask, handler)
