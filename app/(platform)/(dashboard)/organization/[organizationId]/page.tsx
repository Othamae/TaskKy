import { auth } from '@clerk/nextjs'

const OrganizationIdPage = () => {
	const { orgId } = auth()
	return <span>Organization: {orgId}</span>
}

export default OrganizationIdPage
