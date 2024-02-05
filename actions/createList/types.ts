import { List } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '../createSafeAction'
import { CreateList } from './schema'

export type InputType = z.infer<typeof CreateList>
export type ReturnType = ActionState<InputType, List>
