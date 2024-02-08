import { Separator } from '@/components/ui/separator'
import { checkSubscription } from '@/lib/helpers/subscription'
import OrgInfo from '../_components/OrgInfo'
import SubscriptionButton from './_components/SubscriptionButton'

const BillingPage = async () => {
    const isPro = await checkSubscription()
    return (
        <div className='w-full'>
            <OrgInfo isPro={isPro} />
            <Separator className='my-2' />
            <SubscriptionButton isPro={isPro} />
        </div>
    )
}

export default BillingPage