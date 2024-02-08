'use server'
import { db } from '@/lib/db'

import { ERROR_DELETE, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { DeleteList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { id, boardId } = data

	let list
	try {
		list = await db.list.delete({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
		})
		await createAuditLog({
			entityType: ENTITY_TYPE.LIST,
			entityId: list.id,
			entityTitle: list.title,
			action: ACTION.DELETE
		})
	} catch (error) {
		return {
			error: ERROR_DELETE,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: list }
}

export const deleteList = createSafeAction(DeleteList, handler)
