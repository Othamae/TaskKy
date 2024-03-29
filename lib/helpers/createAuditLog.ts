import { auth, currentUser } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { ERROR_USER_NOT_FOUND } from '@/const/errorMessages'
import { db } from '../db'

interface Props {
    entityId: string,
    entityType: ENTITY_TYPE,
    entityTitle: string,
    action: ACTION,
}

export const createAuditLog = async ({ entityId, entityTitle, entityType, action }: Props) => {
    try {
        const { orgId } = auth()
        const user = await currentUser()
        if (!user || !orgId) throw new Error(ERROR_USER_NOT_FOUND)
        await db.auditLog.create({
            data: {
                entityId,
                entityType,
                entityTitle,
                action,
                orgId,
                userId: user.id,
                userName: user.firstName + " " + user.lastName,
                userImage: user?.imageUrl
            }
        })

    } catch (error) {
        console.log('AUDIT_LOG_ERROR', error)
    }
}