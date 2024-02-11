'use client'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CREATE_CHECKLIST, TYPE_CHECKLIST } from '@/const/const'
import { CheckSquare, X } from 'lucide-react'
import ChecklistForm from '../checklist/ChecklistForm'

interface ChecklistButtonProps {
    cardId: string
}

const ChecklistButton = ({ cardId }: ChecklistButtonProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='gray'
                    className='w-full justify-start'
                    size='inLine'
                >
                    <CheckSquare className='w-4 h-4 mr-2' />
                    {TYPE_CHECKLIST}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>{CREATE_CHECKLIST}</div>
                <PopoverClose asChild>
                    <Button className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600' variant='ghost'>
                        <X className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <ChecklistForm cardId={cardId} />               
            </PopoverContent>
        </Popover>


    )
}

export default ChecklistButton