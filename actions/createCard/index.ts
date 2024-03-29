'use server'
import { db } from '@/lib/db'

import { TYPE_LIST } from '@/const/const'
import { ERROR_CREATE, ERROR_NOTFOUND, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CreateCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { title, boardId, listId } = data

	let card
	try {
		const list = await db.list.findUnique({
			where: {
				id: listId,
				board: {
					orgId,
				},
			},
		})
		if (!list) return { error: `${TYPE_LIST} ${ERROR_NOTFOUND}` }

		const lastCard = await db.card.findFirst({
			where: { listId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastCard ? lastCard?.order + 1 : 1

		card = await db.card.create({
			data: {
				title,
				listId,
				order: newOrder,
			},
		})

		await createAuditLog({
			entityId: card.id,
			entityTitle: card.title,
			entityType: ENTITY_TYPE.CARD,
			action: ACTION.CREATE
		})
	} catch (error) {
		return {
			error: ERROR_CREATE,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: card }
}

export const createCard = createSafeAction(CreateCard, handler)
