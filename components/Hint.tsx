import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface HintProps {
	children: React.ReactNode
	description: string
	side?: 'top' | 'right' | 'bottom' | 'left'
	sideOffset?: number
}

const Hint = ({ children, description, side = 'bottom', sideOffset = 0 }: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent sideOffset={sideOffset} side={side} className="text-xs max-w-[200px] break-words">
					{description}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default Hint
