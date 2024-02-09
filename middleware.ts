import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { API_WEBHOOK, HOME, ORGANIZATION, SELECT_ORG } from './const/routes'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
	publicRoutes: [HOME, API_WEBHOOK],
	afterAuth(auth, req) {
		if (auth.userId && auth.isPublicRoute) {
			let path = SELECT_ORG
			if (auth.orgId) {
				path = `${ORGANIZATION}/${auth.orgId}`
			}
			const orgSelection = new URL(path, req.url)
			return NextResponse.redirect(orgSelection)
		}
		if (!auth.userId && !auth.isPublicRoute) {
			return redirectToSignIn({ returnBackUrl: req.url })
		}
		if (auth.userId && !auth.orgId && req.nextUrl.pathname !== SELECT_ORG) {
			const orgSelection = new URL(SELECT_ORG, req.url)
			return NextResponse.redirect(orgSelection)
		}
	},
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
