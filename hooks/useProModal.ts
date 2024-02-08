import { stripeRedirect } from '@/actions/stripeRedirect'
import { proModalStore } from '@/store/proModalStore'
import { toast } from 'sonner'
import { useAction } from './useAction'



export const useProModal = (isPro: boolean) => {
	const proModal = proModalStore()

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data) => {
			window.location.href = data
		},
		onError: (error) => {
			toast.error(error)
		}
	})

	const onClick = () => {
		if (isPro) {
			execute({})
		} else {
			proModal.onOpen()
		}
	}

	return {
		onClick,
		isLoading,
	}
}
