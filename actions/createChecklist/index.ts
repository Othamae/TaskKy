'use server'
import { db } from '@/lib/db'

import { TYPE_CARD } from '@/const/const'
import { ERROR_CREATE, ERROR_NOTFOUND, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CreateChecklist } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { title, boardId, cardId } = data

	let checklist
	try {
		const card = await db.card.findUnique({
			where: {
				id: cardId,
				list: { board: { orgId } }
			},
		})
		if (!card) return { error: `${TYPE_CARD} ${ERROR_NOTFOUND}` }

		const lastChecklist = await db.checklist.findFirst({
			where: { cardId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastChecklist ? lastChecklist?.order + 1 : 1

		checklist = await db.checklist.create({
			data: {
				title,
				cardId,
				order: newOrder,
			},
		})

		await createAuditLog({
			entityId: card.id,
			entityTitle: checklist.title,
			entityType: ENTITY_TYPE.CHECKLIST,
			action: ACTION.CREATE
		})
	} catch (error) {
		return {
			error: ERROR_CREATE,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: checklist }
}

export const createChecklist = createSafeAction(CreateChecklist, handler)
