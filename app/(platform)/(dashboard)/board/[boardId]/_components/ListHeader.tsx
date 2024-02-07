'use client'

import FormInput from '@/components/form/FormInput'
import { useListHeader } from '@/hooks/useListHeader'
import { List } from '@prisma/client'
import ListOptions from './ListOptions'

interface ListHeaderProps {
    list: List
    onAddCard: () => void
}
const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
    const { title, onBlur, handleSubmit, enableEditing, inputRef, isEditing, formRef } = useListHeader(list.title)
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
                onAddCard={onAddCard}></ListOptions>
        </div>
    )
}

export default ListHeader