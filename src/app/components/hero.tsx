import Balancer from "react-wrap-balancer";

export default async function Hero() {
	return (
		<section>
			<div className="container flex w-full flex-col items-center justify-center space-y-20 py-14 xl:py-24">
				<div className="mx-auto w-full max-w-2xl ">
					<h1 className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-center font-heading text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm duration-300 ease-linear animate-in zoom-in-50 dark:bg-gradient-to-br dark:from-gray-100 dark:to-gray-900 md:text-7xl md:leading-[5rem]">
						<Balancer>Cross Streams</Balancer>
					</h1>
					<p className="mt-6 text-center text-muted-foreground md:text-xl">
						<Balancer>
							A cross-chain plugin for NFT marketplaces, grants, and funding platforms.
						</Balancer>
					</p>
				</div>
			</div>
		</section>
	);
}