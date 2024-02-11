'use client'

import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { CHECKLIST_ACTIONS, COPY_CHECKLIST, DELETE_THIS_CHECKLIST } from '@/const/const'
import { useOptions } from '@/hooks/useOptions'
import { ChecklistWithTasks } from '@/lib/types'
import { MoreHorizontal, X } from 'lucide-react'

interface ChecklistOptionsProps {
    checklist: ChecklistWithTasks
}
const ChecklistOptions = ({ checklist }: ChecklistOptionsProps) => {
    const { handleCopy, handleDelete, closeRef } = useOptions({ type: 'Checklist' })
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-auto w-auto p-2' variant='ghost'>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>{CHECKLIST_ACTIONS}</div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant='ghost'>
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <form action={handleCopy}>
                    <input hidden id='id' name='id' value={checklist.id} />
                    <input hidden id='cardId' name='cardId' value={checklist.cardId} />
                    <FormSubmitButton
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                        variant='ghost'
                    >
                        {COPY_CHECKLIST}...
                    </FormSubmitButton>
                </form>
                <Separator />
                <form action={handleDelete}>
                    <input hidden id='id' name='id' value={checklist.id} />
                    <input hidden id='cardId' name='cardId' value={checklist.cardId} />
                    <FormSubmitButton
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                        variant='ghost'
                    >
                        {DELETE_THIS_CHECKLIST}...
                    </FormSubmitButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default ChecklistOptions