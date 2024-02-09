import { Checklist } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '../createSafeAction'
import { CreateChecklist } from './schema'

export type InputType = z.infer<typeof CreateChecklist>
export type ReturnType = ActionState<InputType, Checklist>
