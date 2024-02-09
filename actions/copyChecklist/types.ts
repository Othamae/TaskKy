import { Checklist } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '../createSafeAction'
import { CopyChecklist } from './schema'

export type InputType = z.infer<typeof CopyChecklist>
export type ReturnType = ActionState<InputType, Checklist>
