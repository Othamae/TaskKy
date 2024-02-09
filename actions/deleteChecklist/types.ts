import { Checklist } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '../createSafeAction'
import { DeleteChecklist } from './schema'

export type InputType = z.infer<typeof DeleteChecklist>
export type ReturnType = ActionState<InputType, Checklist>
