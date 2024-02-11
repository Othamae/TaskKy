import { ChecklistWithTasks } from '@/lib/types'
import ChecklistHeader from './ChecklistHeader'
import Tasks from './task/Tasks'

interface ChecklistItemProps {
    item: ChecklistWithTasks
}

const ChecklistItem = ({ item }: ChecklistItemProps) => {
    return (
        <li>
            <ChecklistHeader checklist={item} />
            <Tasks checklist={item} />
        </li>

    )
}

export default ChecklistItem