'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardModal } from '@/hooks/useCardModal'
import { format } from 'date-fns'
import Actions from './Actions'
import Activity from './Activity'
import AddToCard from './AddToCard'
import Description from './Description'
import Header from './Header'
import Checklist from './checklist/Checklist'


const CardModal = () => {	
	const { isOpen, onClose, cardData, checkListData, auditLogsData } = useCardModal()
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='overflow-y-scroll max-h-screen no-scrollbar'>
				{!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
				<div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
					<div className='col-span-3'>
						<div className='w-full space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
								<p>Aqui labels</p>
								<p> {cardData?.duedate && format(cardData?.duedate, "PPP")}</p>
							</div>
							{!cardData
								? <Description.Skeleton />
								: <Description data={cardData} />
							}
							{!checkListData || !cardData
								? <Checklist.Skeleton />
								: <Checklist items={checkListData} />
							}
							{!auditLogsData
								? <Activity.Skeleton />
								: <Activity items={auditLogsData} />
							}
						</div>
					</div>
					<div>
						{!checkListData || !cardData ? <AddToCard.Skeleton /> : <AddToCard checklistData={checkListData} cardData={cardData} />}
						{!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default CardModal
