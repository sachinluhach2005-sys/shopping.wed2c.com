'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface ProductGridProps {
    products: Product[];
    isSearch: boolean;
}

export default function ProductGrid({ products, isSearch }: ProductGridProps) {
    const [showAll, setShowAll] = useState(false);

    // If searching, show everything.
    // If not searching (Home), show Celebrity Choice OR everything if showAll is true.
    const visibleProducts = isSearch || showAll
        ? products
        : products.filter(p => p.isCelebrityChoice);

    const hasHiddenProducts = !isSearch && !showAll && products.some(p => !p.isCelebrityChoice);
    const hiddenCount = products.length - visibleProducts.length;

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    We couldn't find any products matching your criteria. Try searching for something else.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                <AnimatePresence mode='popLayout'>
                    {visibleProducts.map((product) => (
                        <motion.div
                            layout
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {hasHiddenProducts && (
                <div className="flex justify-center pt-8 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={() => setShowAll(true)}
                        className="group flex flex-col items-center gap-3 transition-all hover:scale-105"
                    >
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            View {hiddenCount} More Products
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-blue-500 transition-all">
                            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}
