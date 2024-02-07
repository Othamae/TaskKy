'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'

interface FormSubmitButtonProps {
	children: React.ReactNode
	disabled?: boolean
	className?: string
	variant?: 'primary' | 'secondary' | 'default' | 'destructive' | 'outline' | 'ghost' | 'link'
}

const FormSubmitButton = ({ children, disabled, className, variant = 'primary' }: FormSubmitButtonProps) => {
	const { pending } = useFormStatus()
	return (
		<Button variant={variant} disabled={pending || disabled} className={cn(className)} type='submit' size='sm'>
			{children}
		</Button>
	)
}

export default FormSubmitButton
