import { z } from 'zod'

import { TaskWithCheckList } from '@/lib/types'
import { ActionState } from '../createSafeAction'
import { UpdateTask } from './schema'

export type InputType = z.infer<typeof UpdateTask>
export type ReturnType = ActionState<InputType, TaskWithCheckList>
