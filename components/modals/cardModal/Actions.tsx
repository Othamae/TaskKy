'use client'

import { copyCard } from '@/actions/copyCard'
import { deleteCard } from '@/actions/deleteCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/useAction'
import { CardWithList } from '@/lib/types'
import { cardModalStore } from '@/store/cardModalStore'
import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

interface ActionsProps {
	data: CardWithList
}
const Actions = ({ data }: ActionsProps) => {
	const params = useParams()
	const boardId = params.boardId as string
	const cardModal = cardModalStore()

	const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
		onSuccess: (data) => {
			toast.success(`Card "${data.title}" copied`)
			cardModal.onClose()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
		onSuccess: (data) => {
			toast.success(`Card "${data.title}" deleted`)
			cardModal.onClose()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const handleCopyCard = () => {
		executeCopyCard({ boardId, id: data.id })
	}

	const handleDeleteCard = () => {
		executeDeleteCard({ boardId, id: data.id })
	}

	return (
		<div className='space-y-2 mt-2'>
			<p className='text-xs font-semibold'>Actions</p>
			<Button
				variant='gray'
				className='w-full justify-start'
				size='inLine'
				onClick={handleCopyCard}
				disabled={isLoadingCopy}
			>
				<Copy className='w-4 h-4 mr-2' />
				Copy
			</Button>
			<Button
				variant='gray'
				className='w-full justify-start'
				size='inLine'
				onClick={handleDeleteCard}
				disabled={isLoadingDelete}
			>
				<Trash className='w-4 h-4 mr-2' />
				Delete
			</Button>
		</div>
	)
}

Actions.Skeleton = function ActionsSkeleton() {
	return (
		<div className=''>
			<Skeleton className='w-20 h-4 bg-neutral-200' />
			<Skeleton className='w-full h-8 bg-neutral-200' />
			<Skeleton className='w-full h-8 bg-neutral-200' />
		</div>
	)
}

export default Actions
