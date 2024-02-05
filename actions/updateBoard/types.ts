import { Board } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '../createSafeAction'
import { UpdateBoard } from './schema'

export type InputType = z.infer<typeof UpdateBoard>
export type ReturnType = ActionState<InputType, Board>
