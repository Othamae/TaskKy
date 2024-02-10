import { z } from 'zod'

export const DeleteTask = z.object({
	title: z.optional(
		z
			.string({
				required_error: 'Title is required',
				invalid_type_error: 'Title is required',
			})
			.min(3, {
				message: 'Title must be at least 3 characters',
			}),
	),
	id: z.string(),
	checklistId: z.string(),
	cardId: z.string(),
	boardId: z.string(),
})
