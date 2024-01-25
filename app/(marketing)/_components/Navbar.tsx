import Logo from '@/components/Logo'
import Link from 'next/link'

const Navbar = () => {
	return (
		<div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
			<div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
				<Logo />
				<div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
					<Link
						href="/sign-in"
						className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
					>
						Login
					</Link>
					<Link
						href="/sign-up"
						className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
					>
						Get TaskKy for free
					</Link>
				</div>
			</div>
		</div>
	)
}

// inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2
export default Navbar
