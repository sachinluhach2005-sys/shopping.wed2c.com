import Link from 'next/link';
import { getProducts } from '@/lib/store';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  const products = await getProducts(q);

  const categoryTitle = q ? `${q.charAt(0).toUpperCase() + q.slice(1)}` : 'Featured Collection';

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <main className="flex-1">
        {/* Hero Section - Only show on main page */}
        {!q && (
          <>
            <section className="relative overflow-hidden pt-24 pb-32 lg:pt-40 lg:pb-48 bg-white dark:bg-gray-950">
              {/* Decorative Blobs */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] opacity-60" />
              </div>

              <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
                  <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl text-gray-900 dark:text-white leading-tight">
                    Elevate Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Lifestyle.</span>
                  </h1>
                  <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                    Discover a curated selection of premium products designed for the modern individual. Quality, style, and innovation in every item.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <Link
                      href="#products"
                      className="inline-flex h-14 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black px-10 text-base font-semibold shadow-xl hover:scale-105 transition-transform duration-300"
                    >
                      Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Indicators */}
            <section className="border-y border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-300">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-sm">Secure Payment</h4>
                      <p className="text-xs text-gray-500">100% Protected Transactions</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-300">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-sm">Fast Shipping</h4>
                      <p className="text-xs text-gray-500">Tracked Delivery Worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-300">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600">
                      <RotateCcw className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-sm">Easy Returns</h4>
                      <p className="text-xs text-gray-500">30-Day Money Back Guarantee</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Product Grid */}
        <section id="products" className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">{categoryTitle}</h2>
              <p className="text-gray-500">Explore our hand-picked selection.</p>
            </div>
            <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
              {products.length} Products
            </span>
          </div>

          <div className="mt-12">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6">
                  <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  We couldn't find any products matching your criteria. Try searching for something else.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
