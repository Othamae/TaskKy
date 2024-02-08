'use client'

import { useFormPicker } from '@/hooks/useFormPicker'
import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import FormErrors from './FormErrors'

interface FormPickerProps {
	id: string
	errors?: Record<string, string[] | undefined>
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
	const { images, isLoading, pending, selectedImageId, handleClick } = useFormPicker()

	return (
		isLoading
			?
			<div className='p-6 flex items-center justify-center'>
				<Loader2 className='h-6 w-6 text-sky-700 animate-spin' />
			</div>
			:
			<div className='relative'>
				<div className='grid grid-cols-3 gap-2 mb-2'>
					{images.map((image) => (
						<div
							key={image.id}
							className={cn(
								'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
								pending && 'opacity-50 hover:opacity-50 cursor-auto',
							)}
							onClick={() => handleClick(image.id)}
						>
							<input
								type='radio'
								id={id}
								name={id}
								className='hidden'
								checked={selectedImageId === image.id}
								disabled={pending}
								value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
							/>
							<Image fill alt='Unsplash image' className='object-cover rounded-sm' src={image.urls.thumb} />
							{selectedImageId === image.id && (
								<div className='absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
									<Check className='h-4 w-4 text-white' />
								</div>
							)}
							<Link
								href={image.links.html}
								target='_blank'
								className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
							>
								{image.user.name}
							</Link>
						</div>
					))}
				</div>
				<FormErrors id='image' errors={errors} />
			</div>

	)
}

export default FormPicker
