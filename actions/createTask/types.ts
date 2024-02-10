import { z } from 'zod'

import { TaskWithCheckList } from '@/lib/types'
import { ActionState } from '../createSafeAction'
import { CreateTask } from './schema'

export type InputType = z.infer<typeof CreateTask>
export type ReturnType = ActionState<InputType, TaskWithCheckList>
