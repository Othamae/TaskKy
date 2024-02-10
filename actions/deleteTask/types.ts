import { z } from 'zod'

import { TaskWithCheckList } from '@/lib/types'
import { ActionState } from '../createSafeAction'
import { DeleteTask } from './schema'

export type InputType = z.infer<typeof DeleteTask>
export type ReturnType = ActionState<InputType, TaskWithCheckList>
