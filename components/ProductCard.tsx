import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react';

interface Product {
    id: string;
    url: string;
    title: string;
    description: string;
    image: string;
    price: string;
    currency: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <article
            className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
        >
            {/* Image Section */}
            <div className="aspect-[4/3] relative overflow-hidden bg-gray-50 dark:bg-gray-800">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                        No Image
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Action Button - Slides in */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <a
                        href={product.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white/95 backdrop-blur text-black font-semibold rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
                    >
                        View Details <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {/* Price Tag */}
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm z-10">
                    <span className="text-sm font-bold font-mono text-gray-900 dark:text-white">
                        {product.currency} {product.price}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-semibold text-lg leading-tight mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <span>Premium Quality</span>
                    <span className="flex items-center gap-1 text-blue-600">
                        In Stock
                    </span>
                </div>
            </div>
        </article>
    );
}
