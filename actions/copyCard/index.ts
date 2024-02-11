'use server'
import { db } from '@/lib/db'

import { COPY, TYPE_CARD } from '@/const/const'
import { ERROR_COPY, ERROR_NOTFOUND, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CopyCard } from './schema'
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
		const cardToCopy = await db.card.findUnique({
			where: {
				id,
				list: {
					board: { orgId },
				},
			},
			include: {
				checklists: {
					include: { tasks: true }
				}
			}
		})

		if (!cardToCopy) return { error: `${TYPE_CARD} ${ERROR_NOTFOUND}` }

		const lastCard = await db.card.findFirst({
			where: { listId: cardToCopy.listId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastCard ? lastCard?.order + 1 : 1

		card = await db.card.create({
			data: {
				title: `${cardToCopy.title} - ${COPY}`,
				description: cardToCopy.description,
				order: newOrder,
				listId: cardToCopy.listId
			},
		})

		for (const checklist of cardToCopy.checklists) {
			const newChecklist = await db.checklist.create({
				data: {
					title: checklist.title,
					order: checklist.order,
					cardId: card.id,
					tasks: {
						createMany: {
							data: checklist.tasks.map((task) => ({
								title: task.title,
								order: task.order,
							}))
						}
					}
				}
			})
			console.log(newChecklist)
		}


		await createAuditLog({
			entityType: ENTITY_TYPE.CARD,
			entityId: card.id,
			entityTitle: card.title,
			action: ACTION.CREATE
		})
	} catch (error) {
		return {
			error: ERROR_COPY,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler)
