'use server'
import { db } from '@/lib/db'

import { createAuditLog } from '@/lib/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { UpdateList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title, id, boardId } = data

	let list
	try {
		list = await db.list.update({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
			data: {
				title,
			},
		})
		await createAuditLog({
			entityType: ENTITY_TYPE.LIST,
			entityId: list.id,
			entityTitle: list.title,
			action: ACTION.UPDATE
		})
	} catch (error) {
		return {
			error: 'Faile to update',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const updateList = createSafeAction(UpdateList, handler)
