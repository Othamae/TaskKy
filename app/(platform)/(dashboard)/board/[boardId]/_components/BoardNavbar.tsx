import { Board } from '@prisma/client'
import BoardOptions from './BoardOptions'
import BoardTitleForm from './BoardTitleForm'

interface BoardNavbarProps {
	board: Board
}

const BoardNavbar = async ({ board }: BoardNavbarProps) => {
	return (
		<div className='w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white'>
			<BoardTitleForm board={board} />
			<div className='ml-auto'>
				<BoardOptions id={board.id} />
			</div>
		</div>
	)
}

export default BoardNavbar
