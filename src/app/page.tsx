import { ClaimPreviewGrid, Product } from './components/claim-preview';
import Footer from './components/footer';
import Hero from './components/hero';
import { Navigation } from './components/navigation';
import { HypercertFetcher, HypercertFetcherProps } from './components/hypercert-fetcher';

const products: Product[] = [
  {
    title: '',
    description: '',
    tags: ['']
  },
  {
    title: '',
    description: '',
    tags: ['']
  },
  {
    title: '',
    description: '',
    tags: ['']
  },
  {
    title: '',
    description: '',
    tags: ['']
  }
];

export default function Home() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Hero />
        {/*<ClaimPreviewGrid products={products} /> */}
        <HypercertFetcher
          byClaimId=""
          byMetadataUri=""
          useQueryString={true}
          ignoreLoading={false}
          loading={<p>Loading...</p>}
        >
        </HypercertFetcher>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
