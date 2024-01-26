'use client'
import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"

interface FormSubmitButtonProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'default' | 'destructive' | 'outline' | 'ghost' | 'link'
}

const FormSubmitButton = ({ children, disabled, className, variant }: FormSubmitButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      variant={variant}
      disabled={pending || disabled}
      className={cn(className)}
      type="submit"
      size='sm'
    >{children}</Button>
  )
}

export default FormSubmitButton