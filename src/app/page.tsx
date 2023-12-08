"use client";
// import { ClaimPreviewGrid, Product } from "./components/claim-preview";
// import Footer from "./components/footer";
// import Hero from "./components/hero";
// import { Navigation } from "./components/navigation";
// import {
//   HypercertFetcherProps,
// } from "./components/hypercert-fetcher";
import { useState, useEffect } from "react";
import { HypercertClient } from "@hypercerts-org/sdk";
import { DEFAULT_CHAIN_ID } from "@/lib/config";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const client = new HypercertClient({
      chain: { id: DEFAULT_CHAIN_ID },
    });
  }, []);
  return null
  // return (
  //   <>
  //     <header>
  //       <Navigation />
  //     </header>
  //     <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //       <Hero />
  //       {/*<ClaimPreviewGrid products={products} /> */}
  //       <HypercertFetcher
  //         byClaimId="0x822f17a9a5eecfd66dbaff7946a8071c265d1d07-187155301806516154904856034087472516300800"
  //         byMetadataUri=""
  //         useQueryString={true}
  //         ignoreLoading={false}
  //         loading={<p>Loading...</p>}
  //       ></HypercertFetcher>
  //     </main>
  //     <footer>
  //       <Footer />
  //     </footer>
  //   </>
  // );
}
