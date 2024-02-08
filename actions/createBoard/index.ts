'use server'
import { db } from '@/lib/db'

import { TYPE_BOARD } from '@/const/const'
import { ERROR_CREATE, ERROR_MISSING_FIELDS, ERROR_REACHED_LIMIT, ERROR_UNAUTHORIZED } from '@/const/errorMessages'
import { BOARD } from '@/const/routes'
import { createAuditLog } from '@/lib/helpers/createAuditLog'
import { hasAvailableCount, incrementAvailableCount } from '@/lib/helpers/orgLimit'
import { checkSubscription } from '@/lib/helpers/subscription'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '../createSafeAction'
import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()
	if (!userId || !orgId) {
		return {
			error: ERROR_UNAUTHORIZED,
		}
	}

	const canCreate = await hasAvailableCount()
	const isPro = await checkSubscription()

	if (!canCreate && !isPro) return { error: ERROR_REACHED_LIMIT }

	const { title, image } = data
	const [imageId, imageThumUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split('|')

	if (!imageId || !imageThumUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
		return {
			error: `${ERROR_MISSING_FIELDS}. ${ERROR_CREATE} ${TYPE_BOARD}.`,
		}
	}

	let board
	try {
		board = await db.board.create({
			data: {
				title,
				orgId,
				imageId,
				imageThumUrl,
				imageFullUrl,
				imageLinkHTML,
				imageUserName,
			},
		})

		if (!isPro) await incrementAvailableCount()
		await createAuditLog({
			entityType: ENTITY_TYPE.BOARD,
			entityId: board.id,
			entityTitle: board.title,
			action: ACTION.CREATE
		})
	} catch (error) {
		return {
			error: ERROR_CREATE,
		}
	}

	revalidatePath(`${BOARD}/${board.id}`)
	return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
