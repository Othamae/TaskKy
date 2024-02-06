'use client'

import { ListWithCards } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ElementRef, useRef, useState } from 'react'
import CardForm from './CardForm'
import CardItem from './CardItem'
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
                <ol className={cn(
                    'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                    list.cards.length > 0 ? 'mt-2' : 'mt-0'
                )}>
                    {
                        list.cards.map((card, index) => (
                            <CardItem key={card.id} index={index} card={card} />
                        ))
                    }
                </ol>
                <CardForm
                    ref={textAreaRef}
                    listId={list.id}
                    isEditing={isEditing}
                    enableEditing={enableEditing}
                    disableEditing={desableEditing}
                />

            </div>
        </li>
    )
}

export default ListItem