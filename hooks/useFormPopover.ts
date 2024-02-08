import { createBoard } from '@/actions/createBoard'
import { SUCCESS_CREATED, TYPE_BOARD } from '@/const/const'
import { BOARD } from '@/const/routes'
import { proModalStore } from '@/store/proModalStore'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'
import { useAction } from './useAction'

export const useFormPopover = () => {
    const closeRef = useRef<ElementRef<'button'>>(null)
    const router = useRouter()
    const proModal = proModalStore()
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success(`${TYPE_BOARD} ${SUCCESS_CREATED}`)
            closeRef.current?.click()
            router.push(`${BOARD}/${data.id}`)
        },
        onError: (error) => {
            toast.error(error)
            proModal.onOpen()
        },
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const image = formData.get('image') as string
        execute({ title, image })
    }

    return {
        onSubmit,
        fieldErrors,
        closeRef
    }
}