'use client'

import { ListWithCards } from "@/lib/types"
import ListForm from "./ListForm"

interface ListContainerProps {
    boardId: string
    list: ListWithCards[]
}

const ListContainer = ({ boardId, list }: ListContainerProps) => {
    return (
        <ol>
            <ListForm />
            <div className="flex-shrink-0 w-1" />
        </ol>
    )
}

export default ListContainer