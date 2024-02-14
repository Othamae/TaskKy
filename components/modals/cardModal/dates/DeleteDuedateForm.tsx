'use client'

import FormSubmitButton from '@/components/form/FormSubmitButton'
import { DELETE_DUE_DATE } from '@/const/const'
import { Trash } from 'lucide-react'
interface DeleteDuedateFormProps {
    handleDelete: () => void
}

const DeleteDuedateForm = ({ handleDelete }: DeleteDuedateFormProps) => {
    return (
        <form action={handleDelete} className=''>
            <FormSubmitButton
                className='rounded-none w-full h-auto p-2 px-3 justify-start font-normal text-sm'
                variant='ghost'
            >
                <Trash className='w-4 h-4 mr-2' />
                {DELETE_DUE_DATE}
            </FormSubmitButton>
        </form>
    )
}

export default DeleteDuedateForm