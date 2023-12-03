import { ClaimPreviewGrid, Product } from './components/claim-preview';
import Footer from './components/footer';
import Hero from './components/hero';
import { Navigation } from './components/navigation';
const products: Product[] = [
  {
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality sound with noise cancellation feature.',
    tags: ['Electronics', 'Audio', 'Wireless']
  },
  {
    title: 'Smart LED TV',
    description: '4K UHD Smart LED TV with HDR and Alexa Compatibility.',
    tags: ['Electronics', 'TV', 'Smart', '4K UHD']
  },
  {
    title: 'Stainless Steel Microwave Oven',
    description: 'Compact size perfect for small kitchens or dorm rooms.',
    tags: ['Home Appliances', 'Microwave', 'Compact', 'Stainless Steel']
  },
  {
    title: 'Portable Air Conditioner',
    description: 'Portable air conditioner with dehumidifier & fan for rooms.',
    tags: ['Home Appliances', 'Air Conditioner', 'Portable', 'Dehumidifier']
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
        <ClaimPreviewGrid products={products} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
