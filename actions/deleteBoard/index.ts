'use server'
import { db } from '@/lib/db'

import { ERROR_DELETE, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { ORGANIZATION } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { decreaseAvailableCount } from '@/lib/helpers/orgLimit'
import { checkSubscription } from '@/lib/helpers/subscription'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSafeAction } from '../createSafeAction'
import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const isPro = await checkSubscription()
	const { id } = data

	let board
	try {
		board = await db.board.delete({
			where: {
				id,
				orgId,
			},
		})

		if (!isPro) await decreaseAvailableCount()
		await createAuditLog({
			entityType: ENTITY_TYPE.BOARD,
			entityId: board.id,
			entityTitle: board.title,
			action: ACTION.DELETE
		})
	} catch (error) {
		return {
			error: ERROR_DELETE,
		}
	}

	revalidatePath(`${ORGANIZATION}/${orgId}`)
	redirect(`${ORGANIZATION}/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
