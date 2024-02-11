'use client'

import FormInput from '@/components/form/FormInput'
import { ENTER_A_CHECKLIST_TITTLE_PLACEHOLDER } from '@/const/const'
import { useHeader } from '@/hooks/useHeader'
import { ChecklistWithTasks } from '@/lib/types'
import { CheckSquare } from 'lucide-react'
import ChecklistOptions from './ChecklistOptions'

interface ChecklistHeaderProps {
    checklist: ChecklistWithTasks
}

const ChecklistHeader = ({ checklist }: ChecklistHeaderProps) => {
    const { title, onBlur, handleSubmit, enableEditing, inputRef, isEditing, formRef, fieldErrorsChecklist } = useHeader({ defaultTitle: checklist.title, type: 'Checklist' })

    return (
        <div className='flex justify-between items-start gap-x-2 w-full'>
            <CheckSquare className='h-5 w-5 mt-0.5 text-neutral-700' />
            {isEditing ? (
                <form action={handleSubmit} ref={formRef} className='flex-1 px-[2px]'>
                    <input hidden id='id' name='id' value={checklist.id} />
                    <input hidden id='cardId' name='cardId' value={checklist.cardId} />
                    <FormInput
                        ref={inputRef}
                        id='title'
                        onBlur={onBlur}
                        placeholder={ENTER_A_CHECKLIST_TITTLE_PLACEHOLDER}
                        defaultValue={title}
                        errors={fieldErrorsChecklist}
                        className='text-base px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
                    />
                    <button hidden type='submit' />
                </form>
            ) : (
                <div onClick={enableEditing}
                    className='w-full text-base px-2.5 h-7 font-semibold border-transparent'>
                    {title}
                </div>
            )}
            <ChecklistOptions checklist={checklist} />
        </div>
    )
}

export default ChecklistHeader