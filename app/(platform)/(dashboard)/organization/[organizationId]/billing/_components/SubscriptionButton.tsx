'use client'

import { Button } from '@/components/ui/button'
import { MANAGE_SUBSCRIPTION, UPGRADE_PRO } from '@/const/const'
import { useProModal } from '@/hooks/useProModal'

interface SubscriptionButtonProps {
    isPro: boolean
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
    const { isLoading, onClick } = useProModal(isPro)
    return (
        <Button variant='primary'
            onClick={onClick}
            disabled={isLoading}>
            {isPro ? MANAGE_SUBSCRIPTION : UPGRADE_PRO}
        </Button>
    )
}

export default SubscriptionButton