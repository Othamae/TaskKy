import { TYPE_BOARD } from '@/const/const'
import { SELECT_ORG } from '@/const/routes'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import BoardNavbar from './_components/BoardNavbar'

export async function generateMetadata({ params }: { params: { boardId: string } }) {
	const { orgId } = auth()
	if (!orgId) return { title: TYPE_BOARD }
	const board = await db.board.findUnique({
		where: {
			id: params.boardId,
			orgId,
		},
	})
	return { title: board?.title || TYPE_BOARD }
}

const BoardIdLayout = async ({ children, params }: { children: React.ReactNode; params: { boardId: string } }) => {
	const { orgId } = auth()
	if (!orgId) redirect(SELECT_ORG)
	const board = await db.board.findUnique({
		where: {
			id: params.boardId,
			orgId,
		},
	})
	if (!board) notFound()
	return (
		<div
			className='relative h-full bg-no-repeat bg-cover bg-center'
			style={{ backgroundImage: `url(${board.imageFullUrl})` }}
		>
			<BoardNavbar board={board} />
			<div className='absolute inset-0 bg-black/10' />
			<main className='relative pt-28 h-full'>{children}</main>
		</div>
	)
}

export default BoardIdLayout
