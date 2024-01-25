import { headingFont } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href='/'>
            <div className='hover:opacity-75 transiton items-center gap-x-1 hidden md:flex'>
                <Image
                    src='/logo.webp'
                    alt='Logo'
                    width={30}
                    height={30}></Image>
                <p className={cn('text-lg text-neutral-700 mt-1',
                    headingFont.className)}>TaskKy</p>
            </div>
        </Link>
    )
}

export default Logo