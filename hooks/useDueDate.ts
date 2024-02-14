import { updateCard } from '@/actions/updateCard'
import { ADDED_FOR, SUCCESS_COMPLETED, SUCCESS_DELETED, SUCCESS_NOT_COMPLETED, TYPE_CARD, TYPE_DUE_DATE } from '@/const/const'
import { useAction } from '@/hooks/useAction'
import { revalidateQueries } from '@/lib/helpers/helpers'
import { cardModalStore } from '@/store/cardModalStore'
import { Card } from '@prisma/client'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useQueryClient } from '@tanstack/react-query'
import { addDays } from 'date-fns'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import { useEditing } from './useEditing'


export const useDueDate = () => {
    const [date, setDate] = useState<Date | undefined>()
    const [isCompleted, setIsCompleted] = useState(false)
    const { id, setDueDate } = cardModalStore()
    const queryClient = useQueryClient()
    const params = useParams()
    const boarIDfromParams = params.boardId as string
    const cardId = id as string
    let toCompleteCard = false
    let uncompleted = false
    let deleteDuedate = false

    const formRef = useRef<ElementRef<'form'>>(null)
    const inputRef = useRef<ElementRef<'input'>>(null)
    const closeRef = useRef<ElementRef<'button'>>(null)

    const { disableEditing, enableEditing, isEditing } = useEditing({ refElement: inputRef, select: true })


    const { execute: executeUpdateCard, fieldErrors: fieldErrorsCard } = useAction(updateCard, {
        onSuccess: (data) => {
            revalidateQueries(data.id, queryClient)
            deleteDuedate
                ? toast.success(`${TYPE_DUE_DATE} for "${data.title}" ${SUCCESS_DELETED}`)
                : toast.success(toCompleteCard ? `${TYPE_CARD} "${data.title}" ${uncompleted ? SUCCESS_NOT_COMPLETED : SUCCESS_COMPLETED}` : `${TYPE_DUE_DATE} ${ADDED_FOR} ${TYPE_CARD} "${data.title}" `)
            setDate(data.duedate ?? undefined)
            setDueDate(data.duedate!)
            setIsCompleted(data.completed ?? false)
            disableEditing()
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        },
    })

    const onChange = (value: string) =>
        setDate(addDays(new Date(), parseInt(value)))


    const handleSubmit = (formData: FormData) => {
        executeUpdateCard({ boardId: boarIDfromParams, id: cardId, duedate: date })
    }
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            formRef.current?.submit()
        }
    }

    const handleDeleteDuedate = () => {
        deleteDuedate = true
        executeUpdateCard({ boardId: boarIDfromParams, id: cardId, duedate: null, completed: false })
    }

    const onCheckedChange = (event: CheckedState) => {
        const value = event.valueOf() as boolean
        console.log(value)
        setIsCompleted(value)
        toCompleteCard = true
        uncompleted = !value
        executeUpdateCard({ boardId: boarIDfromParams, id: cardId, duedate: date, completed: value })
    }

    const handleComplete = (card: Card) => {
        uncompleted = card.completed || false
        toCompleteCard = true
        executeUpdateCard({ boardId: boarIDfromParams, id: card.id, completed: !card.completed })

    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
        inputRef.current?.form?.requestSubmit()
    }

    useEventListener('keydown', onKeyDown)
    return {
        onBlur,
        handleSubmit,
        enableEditing,
        inputRef,
        isEditing,
        formRef,
        fieldErrorsCard,
        onChange,
        date,
        setDate,
        closeRef,
        onCheckedChange,
        isCompleted,
        handleDeleteDuedate,
        handleComplete
    }
}