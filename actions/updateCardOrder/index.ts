'use server'
import { db } from '@/lib/db'

import { ERROR_REORDER, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { UpdateCardOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { items, boardId } = data

	let updatedCards
	try {
		const transaction = items.map((card) =>
			db.card.update({
				where: {
					id: card.id,
					list: {
						board: {
							orgId,
						},
					},
				},
				data: {
					order: card.order,
					listId: card.listId,
				},
			}),
		)
		updatedCards = await db.$transaction(transaction)
	} catch (error) {
		return {
			error: ERROR_REORDER,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
