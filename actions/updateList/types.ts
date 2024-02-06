import { List } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '../createSafeAction'
import { UpdateList } from './schema'

export type InputType = z.infer<typeof UpdateList>
export type ReturnType = ActionState<InputType, List>
