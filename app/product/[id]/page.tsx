import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/store';
import { ShoppingBag, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PageProps {
    params: Promise<{
        id: string;
    }>
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const products = await getProducts();
    const product = products.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {/* Navbar */}
            <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Shop
                    </Link>
                    <Link href="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ShoppingWed
                    </Link>
                    <div className="w-20" /> {/* Spacer */}
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden rounded-3xl bg-gray-100 border border-gray-200 dark:border-gray-800">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image Available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                                    <Check className="w-3 h-3" /> In Stock
                                </span>
                                <span className="flex items-center gap-1">
                                    <ShieldCheck className="w-4 h-4" /> Authenticity Guaranteed
                                </span>
                            </div>
                            <p className="text-4xl font-bold text-blue-600">
                                {product.currency} {product.price}
                            </p>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {product.description || "No description provided."}
                            </p>
                        </div>

                        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 space-y-4">
                            <a
                                href={product.url}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Buy Now
                            </a>
                            <p className="text-center text-xs text-gray-400">
                                Secure checkout provided by partner.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
