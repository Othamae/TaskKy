import { create } from 'zustand'

type CardModalStore = {
	id?: string
	isOpen: boolean
	onOpen: (id: string) => void
	onClose: () => void
	listId?: string
	setListId: (listId: string) => void
}

export const cardModalStore = create<CardModalStore>((set) => ({
	id: undefined,
	isOpen: false,
	onOpen: (id: string) => set({ isOpen: true, id }),
	onClose: () => set({ isOpen: false, id: undefined }),
	listId: undefined,
	setListId: (listId: string) => set({ listId }),
}))
