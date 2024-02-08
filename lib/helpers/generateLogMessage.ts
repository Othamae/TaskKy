import { ACTION, AuditLog } from '@prisma/client'

export const generateLogMessage = (log: AuditLog) => {
    const { action, entityTitle, entityType } = log

    if (action === ACTION.CREATE) return `created ${entityType.toLowerCase()} "${entityTitle}"`

    if (action === ACTION.UPDATE) return `updated ${entityType.toLowerCase()} "${entityTitle}"`

    if (action === ACTION.DELETE) return `deleted ${entityType.toLowerCase()} "${entityTitle}"`

    if (!action) return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`
}