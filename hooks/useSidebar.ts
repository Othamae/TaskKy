import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { useLocalStorage } from 'usehooks-ts'

interface UseSidebarProps {
    storageKey: string
}


export const useSidebar = ({ storageKey }: UseSidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})
    const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization()

    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    })

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
        if (expanded[key]) {
            acc.push(key)
        }
        return acc
    }, [])

    const onExapand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id],
        }))
    }

    return {
        onExapand,
        isLoadedOrg,
        isLoadedOrgList,
        userMemberships,
        defaultAccordionValue,
        expanded,
        activeOrganization
    }
}