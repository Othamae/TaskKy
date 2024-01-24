import { Button } from "@/components/ui/button"
import { headingFont } from '@/lib/fonts'
import { cn } from "@/lib/utils"
import { Medal } from "lucide-react"
import Link from "next/link"

export default function MarketingPage() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn("flex items-center justify-center flex-col",
        headingFont.className)}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w6 mr-2" />
          No 1 task management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          TaskKy helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-2 w-fit">
          work forward.
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with TaskKy.
      </div>
      <Button className="mt-6" size='lg' asChild>
        <Link href='/sign-up'>
          Get TaskKy for free
        </Link>
      </Button>

    </div>
  )
}