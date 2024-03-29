import { z } from 'zod'

export const UpdateTask = z.object({
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
	boardId: z.string(),
	checklistId: z.string(),
	cardId: z.string(),
	completed: z.optional(z.boolean()),
})
