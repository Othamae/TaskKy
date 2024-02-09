'use server'
import { db } from '@/lib/db'

import { COPY, TYPE_CHECKLIST } from '@/const/const'
import { ERROR_NOTFOUND, ERROR_UNAUTHORIZED, ERROR_UPDATE } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CopyChecklist } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { id, boardId, cardId } = data

	let checklist
	try {
		const checklistToCopy = await db.checklist.findUnique({
			where: {
				id,
				card: {
					list: { board: { orgId } }
				},
				cardId
			},
			include: {
				tasks: true
			}
		})

		if (!checklistToCopy) return { error: `${TYPE_CHECKLIST} ${ERROR_NOTFOUND}` }

		const lastChecklist = await db.checklist.findFirst({
			where: { cardId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastChecklist ? lastChecklist?.order + 1 : 1

		checklist = await db.checklist.create({
			data: {
				title: `${checklistToCopy.title} - ${COPY}`,
				order: newOrder,
				cardId,
				tasks: {
					createMany: {
						data: checklistToCopy.tasks.map((task) => ({
							title: task.title,
							order: task.order,
						}))
					}
				}
			},
			include: {
				tasks: true,
			}
		})
		await createAuditLog({
			entityId: checklist.cardId,
			entityTitle: checklist.title,
			entityType: ENTITY_TYPE.CHECKLIST,
			action: ACTION.CREATE
		})
	} catch (error) {
		return {
			error: ERROR_UPDATE,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: checklist }
}

export const copyChecklist = createSafeAction(CopyChecklist, handler)
