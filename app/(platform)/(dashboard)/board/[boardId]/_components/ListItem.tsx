'use client'

import { ListWithCards } from '@/lib/types'
import { ElementRef, useRef, useState } from 'react'
import CardForm from './CardForm'
import ListHeader from './ListHeader'

interface ListItemProps {
    index: number
    list: ListWithCards
}

const ListItem = ({ index, list }: ListItemProps) => {
    const textAreaRef = useRef<ElementRef<'textarea'>>(null)
    const [isEditing, setIsEditing] = useState(false)

    const desableEditing = () => {
        setIsEditing(false)
    }

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textAreaRef.current?.focus()
        })
    }
    return (
        <li className='shrink-0 h-full w-[272px] select-none'>
            <div className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
                <ListHeader list={list} onAddCard={enableEditing} />
                <CardForm
                    ref={textAreaRef}
                    listId={list.id}
                    isEditing={isEditing}
                    enableEditing={enableEditing}
                    disableEditing={desableEditing}
                ></CardForm>
            </div>
        </li>
    )
}

export default ListItem