'use client'

import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { UseListOptions } from '@/hooks/useListOptions'
import { List } from '@prisma/client'
import { MoreHorizontal, X } from 'lucide-react'


interface ListOptionsProps {
    list: List
    onAddCard: () => void
}

const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
    // const closeRef = useRef<ElementRef<'button'>>(null)
    // const { execute: executeDelete } = useAction(deleteList, {
    //     onSuccess: (data) => {
    //         toast.success(`List "${data.title}" deleted successfully`)
    //         closeRef.current?.click()
    //     },
    //     onError: (error) => {
    //         toast.error(error)
    //     }
    // })
    // const { execute: executeCopy } = useAction(copyList, {
    //     onSuccess: (data) => {
    //         toast.success(`List "${data.title}" copied`)
    //         closeRef.current?.click()
    //     },
    //     onError: (error) => {
    //         toast.error(error)
    //     }
    // })

    // const handleDelete = (formData: FormData) => {
    //     const id = formData.get('id') as string
    //     const boardId = formData.get('boardId') as string
    //     executeDelete({ id, boardId })
    // }

    // const handleCopy = (formData: FormData) => {
    //     const id = formData.get('id') as string
    //     const boardId = formData.get('boardId') as string
    //     executeCopy({ id, boardId })
    // }
    const { handleCopy, handleDelete, closeRef } = UseListOptions()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-auto w-auto p-2' variant='ghost'>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 pt-3 pb-3'
                side='bottom' align='start'>
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    List Actions
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant='ghost'>
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm' variant='ghost'>
                    Add card...
                </Button>
                <form action={handleCopy}>
                    <input hidden id='id' name='id' value={list.id} />
                    <input hidden id='boardId' name='boardId' value={list.boardId} />
                    <FormSubmitButton
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm' variant='ghost'>
                        Copy list...
                    </FormSubmitButton>
                </form>
                <Separator />
                <form action={handleDelete}>
                    <input hidden id='id' name='id' value={list.id} />
                    <input hidden id='boardId' name='boardId' value={list.boardId} />
                    <FormSubmitButton
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm' variant='ghost'>
                        Delete this list...
                    </FormSubmitButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}

export default ListOptions