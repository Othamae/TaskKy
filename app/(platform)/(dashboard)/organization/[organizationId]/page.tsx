import { OrganizationSwitcher, auth } from "@clerk/nextjs"

const OrganizationIdPage = () => {
    const { orgId } = auth()
    return (
        <OrganizationSwitcher
            hidePersonal />
    )
}

export default OrganizationIdPage