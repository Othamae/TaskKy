import { z } from 'zod'

export const CopyChecklist = z.object({
	id: z.string(),
	boardId: z.string(),
	cardId: z.string(),
})
