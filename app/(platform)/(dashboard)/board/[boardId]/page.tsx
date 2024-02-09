import { getListsForBoardIdPage } from '@/lib/helpers/dbHelpers'
import ListContainer from './_components/ListContainer'

interface BoardIdPageProps {
	params: {
		boardId: string
	}
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
	const boardId = params.boardId
	const lists = await getListsForBoardIdPage(boardId)

	return (
		<div className='p-4 h-full overflow-x-auto'>
			<ListContainer boardId={boardId} list={lists} />
		</div>
	)
}

export default BoardIdPage
