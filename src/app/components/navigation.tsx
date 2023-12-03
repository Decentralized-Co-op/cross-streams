"use client"

import { cn } from "@/lib/utils"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import { usePathname } from "next/navigation"
import site from "../config/site"
import { DarkModeToggle } from "./dark-mode-toggle"

export function Navigation() {
	const pathname = usePathname()

	return (
		<div className="mr-4 hidden md:flex p-6">
			<Link href="/" className="mr-6 flex items-center space-x-2">
				<span className="hidden font-bold sm:inline-block">
					Cross Streams
				</span>
			</Link>
			<nav className="flex items-center space-x-6 text-sm font-medium flex-1">
				<Link
					href={site.links.github}
					target="_blank"
					className={cn(
						"hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
					)}
				>
					GitHub
				</Link>
				<Link
					href={site.links.twitter}
					target="_blank"
					className={cn(
						"hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
					)}
				>
					Twitter
				</Link>
				<Link
					href={site.links.linkedin}
					target="_blank"
					className={cn(
						"hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
					)}
				>
					LinkedIn
				</Link>
			</nav>
			<div className="flex gap-3">
				<ConnectButton />
				<DarkModeToggle />
			</div>
		</div>
	)
}