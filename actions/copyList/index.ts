'use server'
import { db } from '@/lib/db'

import { createAuditLog } from '@/lib/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CopyList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { id, boardId } = data

	let list
	try {
		const listToCopy = await db.list.findUnique({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
			include: {
				cards: true,
			},
		})

		if (!listToCopy) return { error: 'List not found' }

		const lastList = await db.list.findFirst({
			where: { boardId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastList ? lastList?.order + 1 : 1
		list = await db.list.create({
			data: {
				boardId: listToCopy.boardId,
				title: `${listToCopy.title} - Copy`,
				order: newOrder,
				cards: {
					createMany: {
						data: listToCopy.cards.map((card) => ({
							title: card.title,
							description: card.description,
							order: card.order,
						})),
					},
				},
			},
			include: {
				cards: true,
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
			error: 'Faile to copy',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const copyList = createSafeAction(CopyList, handler)
