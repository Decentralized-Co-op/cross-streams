import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "./ui/badge";

export interface Product {
	title: string;
	description: string;
	tags: string[]
}

export interface ClaimPreviewGridProps {
	products: Product[];
}

export const ClaimPreviewGrid: React.FC<ClaimPreviewGridProps> = ({ products }) => (
	<div className="grid grid-cols-1 gap-3 w-full">
		{products.map((product, index) => (
			<ClaimPreview key={index} {...product} />
		))}
	</div>
)

export const ClaimPreview = ({ title, description, tags }: Product) => {
	return (
		<article className="w-full">
			<Link
				href="#"
				className={cn(
					"select-rounded-md block w-full rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-foreground/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
				)}
			>
				<h3 className="my-2 text-2xl font-bold text-foreground">{title}</h3>
				{tags.length > 0 && (
					<ul className="my-4 flex list-none flex-wrap gap-2 p-0">
						{tags.map((tag: string) => (
							<li key={tag}>
								<Badge
									variant="outline"
									className="inline-block rounded-full border border-muted-foreground/50 bg-muted-foreground/10 px-2 py-0.5 text-xs text-muted-foreground"
								>
									{tag}
								</Badge>
							</li>
						))}
					</ul>
				)}
				{description && (
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
				)}
			</Link>
		</article>
	);
};
