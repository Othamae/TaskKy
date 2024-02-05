'use client'
import { createBoard } from '@/actions/createBoard'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAction } from '@/hooks/useAction'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import FormInput from './FormInput'
import FormPicker from './FormPicker'
import FormSubmitButton from './FormSubmitButton'

interface FormPopoverProps {
	children: React.ReactNode
	side?: 'left' | 'right' | 'top' | 'bottom'
	align?: 'start' | 'center' | 'end'
	sideOffset?: number
}

const FormPopover = ({ children, side = 'bottom', align, sideOffset = 0 }: FormPopoverProps) => {
	const closeRef = useRef<ElementRef<'button'>>(null)
	const router = useRouter()
	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => {
			toast.success('Board created')
			closeRef.current?.click()
			router.push(`/board/${data.id}`)
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const image = formData.get('image') as string
		execute({ title, image })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent side={side} align={align} className="w-80 pt-3" sideOffset={sideOffset}>
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">Create board</div>
				<PopoverClose ref={closeRef} asChild>
					<Button className="h-auto w-auto absolute top-2 right-2 text-neutral-600" variant="ghost">
						<X className="h-4 w-4" />
					</Button>
				</PopoverClose>
				<form action={onSubmit} className="space-y-4">
					<div className="space-y-4">
						<FormPicker id="image" errors={fieldErrors}></FormPicker>
						<FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
					</div>
					<FormSubmitButton className="w-full">Create</FormSubmitButton>
				</form>
			</PopoverContent>
		</Popover>
	)
}

export default FormPopover
