import { RefObject, useState } from 'react'

interface useEditingProps {
    select?: boolean
    refElement: RefObject<HTMLInputElement | HTMLTextAreaElement>
}

export const useEditing = ({ refElement, select }: useEditingProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            refElement?.current?.focus()
            if (select) refElement?.current?.select()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }



    return {
        enableEditing,
        isEditing,
        disableEditing
    }
}