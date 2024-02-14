'use client'

import FormInput from '@/components/form/FormInput'
import { Skeleton } from '@/components/ui/skeleton'
import { useHeader } from '@/hooks/useHeader'
import { CardWithList } from '@/lib/types'
import { Layout } from 'lucide-react'

interface HeaderProps {
	data: CardWithList
}

const Header = ({ data }: HeaderProps) => {
	const { handleSubmit, inputRef, title, onBlur, fieldErrorsCard } = useHeader({ type: 'Card', defaultTitle: data.title })
	return (
		<div className='flex items-start gap-x-3 mb-6 w-full'>
			<Layout className='h-5 w-5 mt-1 text-neutral-700' />
			<div className='w-full'>
				<form action={handleSubmit}>
					<FormInput
						id='title'
						ref={inputRef}
						defaultValue={title}
						onBlur={onBlur}
						errors={fieldErrorsCard}
						className='font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate'
					/>
					<input hidden id='id' name='id' value={data.id} />
				</form>
				<p className='text-sm text-muted-foreground'>
					in list <span className='underline'>{data.list.title}</span>
				</p>
			</div>
		</div>
	)
}

export default Header

Header.Skeleton = function HeaderSkeleton() {
	return (
		<div className='flex items-start gap-x-3 mb-6'>
			<Skeleton className='h-6 w-6 mt-1 bg-neutral-200' />
			<div>
				<Skeleton className='w-24 h-6 mb-1 bg-neutral-200' />
				<Skeleton className='w-12 h-6 bg-neutral-200' />
			</div>
		</div>
	)
}
