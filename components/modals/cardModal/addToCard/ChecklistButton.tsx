'use client'
import FormInput from '@/components/form/FormInput'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ADD_CHECKLIST, CREATE_CHECKLIST, ENTER_A_CHECKLIST_TITTLE_PLACEHOLDER, TYPE_CHECKLIST } from '@/const/const'
import { useChecklistForm } from '@/hooks/useChecklistForm'
import { CheckSquare, X } from 'lucide-react'

interface ChecklistButtonProps {
    cardId: string
}

const ChecklistButton = ({ cardId }: ChecklistButtonProps) => {
    const { onSubmit, formRef, fieldErrors, closeRef } = useChecklistForm()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='gray'
                    className='w-full justify-start'
                    size='inLine'
                >
                    <CheckSquare className='w-4 h-4 mr-2' />
                    {TYPE_CHECKLIST}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>{CREATE_CHECKLIST}</div>
                <PopoverClose asChild>
                    <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant='ghost'>
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>

                <form ref={formRef} action={onSubmit} className='m-1 py-0.5 px-1 space-y-4'>
                    <FormInput
                        id='title'
                        placeholder={ENTER_A_CHECKLIST_TITTLE_PLACEHOLDER}
                        errors={fieldErrors}
                        defaultValue={TYPE_CHECKLIST}
                    />
                    <input name='cardId' hidden id='cardId' value={cardId} />
                    <div className='flex items-center gap-x-1'>
                        <FormSubmitButton>{ADD_CHECKLIST}</FormSubmitButton>
                        <PopoverClose asChild ref={closeRef}>
                            <Button size='sm' variant='ghost'>
                                <X className='h-5 w-5' />
                            </Button>
                        </PopoverClose>
                    </div>
                </form>
            </PopoverContent>
        </Popover>


    )
}

export default ChecklistButton