import { Card, Checklist, List, Task } from '@prisma/client'

export type Organization = {
	id: string
	slug: string
	imageUrl: string
	name: string
}

export type ListWithCards = List & { cards: Card[] }

export type CardWithList = Card & { list: List }

export type TaskWithCheckList = Task & { checklist: Checklist }

export type ChecklistWithTasks = Checklist & { tasks: Task[] }

export type CardWithListAndChecklist = Card & { checklist: Checklist[] } & { list: List }