'use client'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CREATE, CREATE_BOARD } from '@/const/const'
import { useFormPopover } from '@/hooks/useFormPopover'
import { X } from 'lucide-react'
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
	const { fieldErrors, onSubmit, closeRef } = useFormPopover()

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent side={side} align={align} className='w-80 pt-3' sideOffset={sideOffset}>
				<div className='text-sm font-medium text-center text-neutral-600 pb-4'>{CREATE_BOARD}</div>
				<PopoverClose ref={closeRef} asChild>
					<Button className='h-auto w-auto absolute top-2 right-2 text-neutral-600' variant='ghost'>
						<X className='h-4 w-4' />
					</Button>
				</PopoverClose>
				<form action={onSubmit} className='space-y-4'>
					<div className='space-y-4'>
						<FormPicker id='image' errors={fieldErrors}></FormPicker>
						<FormInput id='title' label='Board title' type='text' errors={fieldErrors} />
					</div>
					<FormSubmitButton className='w-full'>{CREATE}</FormSubmitButton>
				</form>
			</PopoverContent>
		</Popover>
	)
}

export default FormPopover
