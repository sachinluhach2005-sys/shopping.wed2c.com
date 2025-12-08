import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/store';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Ensure this utility exists

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShoppingWed
            </span>
          </Link>
          <nav className="flex items-center space-x-4">
            {/* Admin Link (Hidden or subtle) */}
            <Link href="/admin" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 mx-4 rounded-3xl mt-4">
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="animate-fade-in space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Discover <span className="text-blue-600">Premium</span> <br />
                Products for You
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Curated selection of high-quality items. Shop with confidence and style.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <Link
                  href="#products"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
        </section>

        {/* Product Grid */}
        <section id="products" className="container mx-auto px-4 py-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <span className="text-muted-foreground">{products.length} Items</span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg">No products available yet.</p>
              <p className="text-sm">Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex flex-col overflow-hidden rounded-2xl border bg-background transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                        Buy Now <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-5">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {product.currency} {product.price}
                      </span>
                      <span className="rounded-full bg-blue-50 text-blue-600 p-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>

    </div>
  );
}
