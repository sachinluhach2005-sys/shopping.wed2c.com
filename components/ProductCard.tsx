'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: string;
    url: string;
    title: string;
    description: string;
    image: string;
    price: string;
    currency: string;
    isCelebrityChoice?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
    const [hasError, setHasError] = useState(false);

    return (
        <article
            className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
        >
            {/* Image Section - Clickable */}
            <a
                href={product.url}
                target="_blank"
                rel="noreferrer"
                className="block aspect-[4/3] relative overflow-hidden bg-gray-50 dark:bg-gray-800"
            >
                {(product.image && !hasError) ? (
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        unoptimized
                        onError={() => setHasError(true)}
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700 bg-gray-100 dark:bg-gray-800/50">
                        <ShoppingBag className="w-12 h-12 opacity-50" />
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content Section */}

            </a>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-semibold text-lg leading-tight mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                        {product.isCelebrityChoice ? (
                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)] animate-pulse">
                                <span className="text-[10px] font-extrabold tracking-tight">CELEBRITY CHOICE</span>
                            </div>
                        ) : (
                            "Premium Quality"
                        )}
                    </span>

                </div>
            </div>
        </article>
    );
}
