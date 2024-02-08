import { ORGANIZATION } from '@/const/routes'
import { OrganizationList } from '@clerk/nextjs'

const CreateOrganizationPage = () => {
	return (
		<OrganizationList
			hidePersonal
			afterCreateOrganizationUrl={`${ORGANIZATION}/:id`}
			afterSelectOrganizationUrl={`${ORGANIZATION}/:id`}
		/>
	)
}

export default CreateOrganizationPage
