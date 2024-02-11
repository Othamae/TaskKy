'use client'

import FormSubmitButton from '@/components/form/FormSubmitButton'
import FormTextarea from '@/components/form/FormTextarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CANCEL, CARD_DESCRIPTION, SAVE } from '@/const/const'
import { useDescription } from '@/hooks/useDescription'
import { CardWithList } from '@/lib/types'
import { AlignLeft } from 'lucide-react'

interface DescriptionProps {
	data: CardWithList
}

const Description = ({ data }: DescriptionProps) => {
	const { onSubmit, textareaRef, formRef, fieldErrors, disableEditing, enableEditing, isEditing } = useDescription(data.id)
	return (
		<div className='flex items-start gap-x-3 w-full'>
			<AlignLeft className='w-4 h-4 mt-0.5 text-neutral-700' />
			<div className='w-full'>
				<p className='font-semibold text-neutral-700 mb-2'>{CARD_DESCRIPTION}</p>
				{isEditing ? (
					<form action={onSubmit} ref={formRef} className='space-y-2'>
						<FormTextarea
							id='description'
							className='w-full mt-2'
							placeholder='Add a more detailed description...'
							defaultValue={data.description || undefined}
							errors={fieldErrors}
							ref={textareaRef}
						/>
						<div className='flex items-center gap-x-2'>
							<FormSubmitButton>{SAVE}</FormSubmitButton>
							<Button type='button' onClick={disableEditing} size='sm' variant='ghost'>
								{CANCEL}
							</Button>
						</div>
					</form>
				) : (
					<div
						className='min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md'
						role='button'
						onClick={enableEditing}
					>
						{data.description || 'Add a more detailed description...'}
					</div>
				)}
			</div>
		</div>
	)
}

Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className='flex items-start gap-x-3 w-full'>
			<Skeleton className='h-6 w-6 bg-neutral-200' />
			<div className='w-full'>
				<Skeleton className='h-6 w-24 mb-6 bg-neutral-200' />
				<Skeleton className='h-[78px] w-full  bg-neutral-200' />
			</div>
		</div>
	)
}

export default Description
