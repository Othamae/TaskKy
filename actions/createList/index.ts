'use server'
import { db } from '@/lib/db'

import { createAuditLog } from '@/lib/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CreateList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title, boardId } = data

	let list
	try {
		const board = await db.board.findUnique({
			where: {
				id: boardId,
				orgId,
			},
		})

		if (!board) return { error: 'Board not found' }

		const lastList = await db.list.findFirst({
			where: { boardId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastList ? lastList.order + 1 : 1
		list = await db.list.create({
			data: {
				title,
				boardId,
				order: newOrder,
			},
		})
		await createAuditLog({
			entityType: ENTITY_TYPE.LIST,
			entityId: list.id,
			entityTitle: list.title,
			action: ACTION.CREATE
		})
	} catch (error) {
		return {
			error: 'Faile to create',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const createList = createSafeAction(CreateList, handler)
