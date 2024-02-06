'use client'

import { updateList } from '@/actions/updateList'
import FormInput from '@/components/form/FormInput'
import { useAction } from '@/hooks/useAction'
import { List } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import ListOptions from './ListOptions'

interface ListHeaderProps {
    list: List
}
const ListHeader = ({ list }: ListHeaderProps) => {
    const [title, setTitle] = useState(list.title)
    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<'form'>>(null)
    const inputRef = useRef<ElementRef<'input'>>(null)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const { execute } = useAction(updateList, {
        onSuccess: (data) => {
            toast.success(`Renamed to "${data.title}"`)
            setTitle(data.title)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            formRef.current?.submit()
        }
    }

    const handleSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const boardId = formData.get('boardId') as string
        const id = formData.get('id') as string
        if (title === list.title) return disableEditing()

        execute({ title, boardId, id })
    }
    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    useEventListener('keydown', onKeyDown)

    return (
        <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
            {
                isEditing ? (
                    <form action={handleSubmit}
                        ref={formRef}
                        className='flex-1 px-[2px]'>
                        <input hidden id='id' name='id' value={list.id} />
                        <input hidden id='boardId' name='boardId' value={list.boardId} />
                        <FormInput
                            ref={inputRef}
                            id='title'
                            onBlur={onBlur}
                            placeholder='Enter list title...'
                            defaultValue={title}
                            className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
                        />
                        <button hidden type='submit' />
                    </form>
                ) :
                    (
                        <div
                            onClick={enableEditing}
                            className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'>
                            {title}
                        </div>
                    )
            }
            <ListOptions
                list={list}
                onAddCard={() => { }}></ListOptions>
        </div>
    )
}

export default ListHeader