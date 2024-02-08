import Logo from '@/components/Logo'
import FormPopover from '@/components/form/FormPopover'
import { Button } from '@/components/ui/button'
import { CREATE } from '@/const/const'
import { HOME, ORGANIZATION, SELECT_ORG } from '@/const/routes'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import MobileSidebar from './MobileSidebar'

const Navbar = () => {
	return (
		<nav className='fixed z-50 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
			<MobileSidebar />
			<div className='flex items-center gap-x-4'>
				<div className='hidden md:flex'>
					<Logo />
				</div>
				<FormPopover align='start' side='bottom' sideOffset={18}>
					<Button variant='primary' size='sm' className='rounded-sm hidden md:block h-auto py-1.5 px-2'>
						{CREATE}
					</Button>
				</FormPopover>
				<FormPopover align='start' side='bottom' sideOffset={18}>
					<Button variant='primary' size='sm' className='rounded-sm md:hidden block'>
						<Plus className='h-4 w-4' />
					</Button>
				</FormPopover>
			</div>

			<div className='ml-auto flex items-center gap-x-2'>
				<OrganizationSwitcher
					hidePersonal
					afterCreateOrganizationUrl={`${ORGANIZATION}/:id`}
					afterLeaveOrganizationUrl={SELECT_ORG}
					afterSelectOrganizationUrl={`${ORGANIZATION}/:id`}
					appearance={{
						elements: {
							rootBox: {
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							},
						},
					}}
				/>
				<UserButton
					afterSignOutUrl={HOME}
					appearance={{
						elements: {
							avatarBox: {
								height: 30,
								width: 30,
							},
						},
					}}
				/>
			</div>
		</nav>
	)
}

export default Navbar
