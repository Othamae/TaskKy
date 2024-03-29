import { z } from 'zod'

export const CreateChecklist = z.object({
	title: z
		.string({
			required_error: 'Title is required',
			invalid_type_error: 'Title is required',
		})
		.min(2, {
			message: 'Title must be at least 2 characters',
		}),
	boardId: z.string(),
	cardId: z.string(),
})
