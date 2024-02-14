import { Progress } from '@/components/ui/progress'
import { getProgress } from '@/lib/helpers/helpers'
import { ChecklistWithTasks } from '@/lib/types'


interface ChecklistProgressProps {
    checklist: ChecklistWithTasks
}

const ChecklistProgress = ({ checklist }: ChecklistProgressProps) => {
    const [value, progress] = getProgress(checklist)
    return (
        <section className='flex items-center gap-2'>
            <div className='text-xs'>{progress}</div>
            <Progress value={value} className="w-full " />

        </section>
    )
}

export default ChecklistProgress