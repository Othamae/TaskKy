'use server'
import { db } from '@/lib/db'

import { ERROR_DELETE, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { DeleteCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { id, boardId } = data

	let card
	try {
		card = await db.card.delete({
			where: {
				id,
				list: {
					board: { orgId },
				},
			},
		})
		await createAuditLog({
			entityId: card.id,
			entityTitle: card.title,
			entityType: ENTITY_TYPE.CARD,
			action: ACTION.DELETE
		})
	} catch (error) {
		return {
			error: ERROR_DELETE,
		}
	}
	card
	revalidatePath(`${BOARD}/${boardId}`)
	return { data: card }
}

export const deleteCard = createSafeAction(DeleteCard, handler)
