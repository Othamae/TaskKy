import Link from 'next/link'

const Footer = () => {
	return (
		<div className='fixed bottom-0 w-full p-4 border-t bg-slate-100'>
			<div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-center '>
				{/* <Logo /> */}
				<div >
					Build With <span className="text-pink-500 text-xl px-1">&#9825; </span>
					by&nbsp;
					<Link
						href="https://othamae.dev"
						target="_blank"
						className="underline underline-offset-2"
					>Othamae
					</Link>
				</div>
				<div>

				</div>
			</div>
		</div>
	)
}

export default Footer
