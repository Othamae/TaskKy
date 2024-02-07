'use server'
import { db } from '@/lib/db'

import { createAuditLog } from '@/lib/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { UpdateCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { id, boardId, ...values } = data

	let card
	try {
		card = await db.card.update({
			where: {
				id,
				list: {
					board: { orgId },
				},
			},
			data: {
				...values,
			},
		})
		await createAuditLog({
			entityId: card.id,
			entityTitle: card.title,
			entityType: ENTITY_TYPE.CARD,
			action: ACTION.UPDATE
		})
	} catch (error) {
		return {
			error: 'Faile to update',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler)
