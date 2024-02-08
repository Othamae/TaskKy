import { usePathname, useRouter } from 'next/navigation'

export const useNavItem = (orgId: string) => {
    const router = useRouter()
    const pathname = usePathname()

    const onClick = (href: string) => {
        router.push(href)
    }

    return {
        onClick,
        pathname,

    }
}