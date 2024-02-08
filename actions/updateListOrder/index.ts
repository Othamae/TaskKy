'use server'
import { db } from '@/lib/db'

import { ERROR_REORDER, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { UpdateListOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { items, boardId } = data

	let lists
	try {
		const transaction = items.map((list) =>
			db.list.update({
				where: {
					id: list.id,
					board: {
						orgId,
					},
				},
				data: {
					order: list.order,
				},
			}),
		)
		lists = await db.$transaction(transaction)
	} catch (error) {
		return {
			error: ERROR_REORDER,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: lists }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)
