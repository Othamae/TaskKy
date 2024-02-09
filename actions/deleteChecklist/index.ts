'use server'
import { db } from '@/lib/db'

import { ERROR_DELETE, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { DeleteChecklist } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const { id, boardId, cardId } = data

	let checklist
	try {
		checklist = await db.checklist.delete({
			where: {
				id,
				card: {
					list: { board: { orgId } }
				},
				cardId
			}
		})
		await createAuditLog({
			entityId: checklist.cardId,
			entityTitle: checklist.title,
			entityType: ENTITY_TYPE.CHECKLIST,
			action: ACTION.DELETE
		})
	} catch (error) {
		return {
			error: ERROR_DELETE,
		}
	}

	revalidatePath(`${BOARD}/${boardId}`)
	return { data: checklist }
}

export const deleteChecklist = createSafeAction(DeleteChecklist, handler)
