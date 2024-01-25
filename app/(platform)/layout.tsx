import { ClerkProvider } from '@clerk/nextjs'

export default function Platformlayout({ children }: { children: React.ReactNode }) {
	return <ClerkProvider>{children}</ClerkProvider>
}
