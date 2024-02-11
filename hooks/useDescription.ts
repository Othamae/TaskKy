import { updateCard } from '@/actions/updateCard'
import { SUCCESS_DESCRIPTION } from '@/const/const'
import { useAction } from '@/hooks/useAction'
import { useEditing } from '@/hooks/useEditing'
import { revalidateQueries } from '@/lib/helpers/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

export const useDescription = (id: string) => {
    const queryClient = useQueryClient()
    const params = useParams()

    const textareaRef = useRef<ElementRef<'textarea'>>(null)
    const formRef = useRef<ElementRef<'form'>>(null)

    const { isEditing, enableEditing, disableEditing } = useEditing({ refElement: textareaRef })

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            toast.success(`${SUCCESS_DESCRIPTION} "${data.title}"`)
            disableEditing()
            revalidateQueries(data.id, queryClient)
        },
        onError: (error) => {
            toast.error(error)
        },
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing()
        }
    }

    useEventListener('keydown', onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const onSubmit = (formData: FormData) => {
        const description = formData.get('description') as string
        const boardId = params.boardId as string

        execute({ description, boardId, id })
    }

    return {
        onSubmit,
        textareaRef,
        formRef,
        fieldErrors,
        disableEditing,
        enableEditing,
        isEditing
    }

}