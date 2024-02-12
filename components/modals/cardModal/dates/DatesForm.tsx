'use client'

import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { PopoverClose } from '@/components/ui/popover'
import { ADD_DUE_DATE, PICK_DAY } from '@/const/const'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { RefObject } from 'react'

interface DatesFormProps {
    date?: Date
    formRef: RefObject<HTMLFormElement>
    handleSubmit: (formData: FormData) => void
    closeRef: RefObject<HTMLButtonElement>
}

const DatesForm = ({ date, formRef, handleSubmit, closeRef }: DatesFormProps) => {
    return (
        <form ref={formRef} action={handleSubmit} className='m-1 py-0.5 px-1 space-y-4'>
            <div className='space-y-2 '>
                <div className='w-full inline-flex items-center align-middle border rounded-md px-2'>
                    <CalendarIcon className="mr-2 h-4 w-4 " />
                    <p className={cn(
                        "text-sm flex h-8 rounded-sm bg-background items-center",
                        !date && "text-muted-foreground"
                    )}>
                        {date ? format(date, "PPP") : <span>{PICK_DAY}</span>}
                    </p>
                </div>
            </div>
            <input name='date' hidden id='date' value={date ? format(date, "PPP") : ''} />
            <div className='flex items-center gap-x-1'>
                <FormSubmitButton>{ADD_DUE_DATE}</FormSubmitButton>
                <PopoverClose asChild ref={closeRef}>
                    <Button size='sm' variant='ghost'>
                        <X className='h-5 w-5' />
                    </Button>
                </PopoverClose>
            </div>
        </form>
    )
}

export default DatesForm