'use client'

import { stripeRedirect } from '@/actions/stripeRedirect'
import { useAction } from '@/hooks/useAction'
import { proModalStore } from '@/store/proModalStore'
import Image from 'next/image'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'

const ProModal = () => {
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
        execute({})
    }

    return (
        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.onClose}
        >
            <DialogContent className='max-w-md p-0 overflow-hidden'>
                <div className='aspect-square relative flex items-center justify-center'>
                    <Image
                        src='/Upgrade.svg'
                        alt='Upgrade'
                        className='object-cover'
                        fill />
                </div>
                <a className='text-xs mx-auto -mt-20'
                    href="https://storyset.com/technology">
                    Technology illustrations by Storyset
                </a>
                <div className='text-neutral-700 mx-auto space-y-6 p-6 -mt-20'>
                    <h2 className='font-semibold text-xl'>Upgrade to TaskKy Pro Today!</h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the best of Taskify
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimited boards</li>
                            <li>Advanced checklists</li>
                            <li>Admin and security features</li>
                            <li>And more!</li>
                        </ul>
                    </div>
                    <Button
                        disabled={isLoading}
                        onClick={onClick}
                        className="w-full"
                        variant="primary"
                    >
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProModal

