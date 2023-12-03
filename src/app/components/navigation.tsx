"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"


import { cn } from "@/src/lib/utils"
import { ConnectButton } from "@rainbow-me/rainbowkit"
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
					href="/docs"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname === "/docs" ? "text-foreground" : "text-foreground/60"
					)}
				>
					Documentation
				</Link>
				<Link
					href="/docs/components"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/docs/components")
							? "text-foreground"
							: "text-foreground/60"
					)}
				>
					Components
				</Link>
				<Link
					href="/themes"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/themes")
							? "text-foreground"
							: "text-foreground/60"
					)}
				>
					Themes
				</Link>
				<Link
					href="/examples"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/examples")
							? "text-foreground"
							: "text-foreground/60"
					)}
				>
					Examples
				</Link>
				<Link
					href="#"
					className={cn(
						"hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
					)}
				>
					GitHub
				</Link>
			</nav>
			<div className="flex gap-3">
				<ConnectButton />
				<DarkModeToggle />
			</div>
		</div>
	)
}