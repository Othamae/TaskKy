"use client"


import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'
import { PICK_DAY } from '@/const/const'
import { useDueDate } from '@/hooks/useDueDate'
import DatesForm from './DatesForm'
import DeleteDuedateForm from './DeleteDuedateForm'

interface DatePickerProps {
    duedate?: Date | null
}

export function DatePicker({ duedate }: DatePickerProps) {
    const { formRef, handleSubmit, date, onChange, setDate, closeRef, handleDeleteDuedate } = useDueDate()

    return (
        <section className=''>
            <div className='m-1 py-0.5 px-1 space-y-2'>
                <Select
                    onValueChange={onChange}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={PICK_DAY} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                </Select>
                <div className="rounded-md border mt-2">
                    <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
            </div>
            <DatesForm date={duedate ? duedate : date} formRef={formRef} handleSubmit={handleSubmit} closeRef={closeRef} />
            <Separator />
            <DeleteDuedateForm handleDelete={handleDeleteDuedate} />
        </section>
    )
}
